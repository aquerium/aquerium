import { QueryListUI } from "../containers/QueryListUI";
import React from "react";
import { TopBarIcons } from "../containers/TopBarIcons";

export function HomeUI() {
  return (
    <>
      <TopBarIcons />
      <QueryListUI />
    </>
  );
}
