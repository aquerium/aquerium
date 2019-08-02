import TileListUI from "./TileListUI";
import React from "react";
import TopBarIcons from "./TopBarIcons";

export const items = [
  { name: "query a", numTasks: 5 },
  { name: "query b", numTasks: 16 },
  { name: "query c", numTasks: 7 },
  { name: "query d", numTasks: 8 },
  { name: "query e", numTasks: 9 },
  { name: "query f", numTasks: 10 },
  {
    name: "query Gasdjkasjksadjkfbkjasfdasjkfk",
    numTasks: 19
  },
  { name: "query h", numTasks: 10 },
  { name: "query j", numTasks: 11 }
];

const HomeUI = () => {
  return (
    <>
      <TopBarIcons />
      <TileListUI />
    </>
  );
};

export default HomeUI;
