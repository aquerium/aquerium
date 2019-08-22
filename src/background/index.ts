import { getQueryMapObj, updateGist } from "../util";
import { getQueryTasks, getQueryURLEndpoint } from "../util";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    token: "",
    username: "",
    gistID: ""
  });
  chrome.alarms.create("refresh", { periodInMinutes: 3 });
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
        for (let key in map) {
          const responseItems = await getQueryTasks(getQueryURLEndpoint(user, map[key]));
          if (responseItems.tasks) {
            const newMap = { ...map };
            newMap[key].tasks = responseItems.tasks;
            await updateGist(user, newMap);
          }
        }
      }
    }
  });
});
