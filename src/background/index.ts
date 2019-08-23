import { getQueryMapObj, updateGist } from "../util";
import { getQueryTasks, getQueryURLEndpoint } from "../util";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    token: "",
    username: "",
    gistID: ""
  });
  chrome.alarms.create("refresh", { periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener(async alarm => {
  chrome.storage.sync.get(["token", "username", "gistID"], async result => {
    if (result.token !== "" && result.username != "" && result.gistID != "") {
      const user = {
        token: result.token,
        username: result.username,
        gistID: result.gistID
      };
      const response = await getQueryMapObj(user);
      const map = response.queryMap;
      if (map) {
        const newMap = { ...map };
        let numTasks = 0;
        for (let key in map) {
          const responseItems = await getQueryTasks(getQueryURLEndpoint(user, map[key]));
          if (
            responseItems.tasks &&
            JSON.stringify(responseItems.tasks) !== JSON.stringify(map[key].tasks)
          ) {
            newMap[key].tasks = responseItems.tasks;
          }
          numTasks += responseItems.tasks.length;
        }
        await updateGist(user, newMap);
        chrome.browserAction.setBadgeText({ text: numTasks.toString() });
      }
    }
  });
});
