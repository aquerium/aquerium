import React from "react";
//import { HomeUI } from "./HomeUI";
import { LoginUI } from "./LoginUI";
import { initializeIcons } from "@uifabric/icons";

initializeIcons();

export function App() {
  //return <HomeUI />;
  return <LoginUI />;
}
