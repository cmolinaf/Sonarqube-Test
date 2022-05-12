import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { RootNavigation } from "./src/navigation/RootNavigation";
import { Routes } from "./src/routes";

const App = () => {
  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
