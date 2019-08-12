import React from "react";
import { HomeUI } from "./HomeUI";
import { initializeIcons } from "@uifabric/icons";

initializeIcons();

export function App() {
  return <HomeUI />;
}
