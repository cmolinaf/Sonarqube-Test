import { createNavigationContainerRef } from "@react-navigation/native";

const navigationRef = createNavigationContainerRef();

const navigate = (name: never, params: never) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const RootNavigation = {
  navigationRef: navigationRef,
  navigate: navigate,
};
