import { getQueryMapObj, updateGist, getQueryTasks, getQueryURLEndpoint } from "../util";
import { IUserInfo } from "../state";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    token: "",
    username: "",
    gistID: "",
    invalidPAT: false
  });
  chrome.alarms.create("refresh", { periodInMinutes: 5 });
  chrome.alarms.create("reasonable count", { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener(async alarm => {
  chrome.storage.sync.get(["token", "username", "gistID"], async result => {
    if (result.token && result.username && result.gistID) {
      const user: IUserInfo = {
        token: result.token,
        username: result.username,
        gistID: result.gistID,
        invalidPAT: false
      };
      const response = await getQueryMapObj(user);
      const map = response.queryMap;
      let badge = 0;
      let numQueriesOver = 0;
      if (map) {
        const newMap = JSON.parse(JSON.stringify(map));
        for (const key in map) {
          const responseItems = await getQueryTasks(getQueryURLEndpoint(user, map[key]));
          if (responseItems.tasks) {
            // Set the contents with the most updated query result.
            newMap[key].tasks = responseItems.tasks;
            // Add the number of "unreasonable" tasks to the badge count.
            const overflow = responseItems.tasks.length - newMap[key].reasonableCount;
            if (overflow > 0) {
              numQueriesOver++;
            }
            badge += overflow;
          }
        }

        const badgeText = badge < 0 ? "0" : badge.toString(); // Prevents displaying negative badges.
        chrome.browserAction.setBadgeText({ text: badgeText });

        // Call updateGist if there were indeed updates to the user's query results.
        if (JSON.stringify(map) !== JSON.stringify(newMap)) {
          await updateGist(user, newMap);
        }
      }
      if (alarm.name === "reasonable count" && numQueriesOver > 0) {
        chrome.notifications.create({
          type: "basic",
          title: "Aquerium",
          message: "You have " + ((numQueriesOver === 1) ? "1 query" : numQueriesOver + " queries") + " with tasks over reasonable count!",
          iconUrl: "logo.png"
        });
      }
    }
  });
});
