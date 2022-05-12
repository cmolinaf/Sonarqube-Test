import notifee, { EventType } from "@notifee/react-native";
import FileViewer from "react-native-file-viewer";

// handle on background notifications
const onBackgroundNotifications = () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        // on dismissed event
        break;
      case EventType.PRESS:
        if (
          detail.notification &&
          detail.notification.id &&
          detail.pressAction
        ) {
          // Check if the user pressed the 'open-downloaded-file' action
          if (
            detail.pressAction.id === "open-downloaded-file" &&
            detail.notification.data
          ) {
            FileViewer.open(detail.notification.data.filePath);

            // Remove the notification
            await notifee.cancelNotification(detail.notification.id);
          }
        }
        break;
    }
  });
};

// handle on foreground notifications

const onForegroundDownloadFile = () => {
  notifee.onForegroundEvent(async ({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        // on dismissed event
        break;
      case EventType.PRESS:
        if (
          detail.notification &&
          detail.notification.id &&
          detail.pressAction
        ) {
          // Check if the user pressed the 'open-downloaded-file' action
          if (
            detail.pressAction.id === "open-downloaded-file" &&
            detail.notification.data
          ) {
            FileViewer.open(detail.notification.data.filePath);

            // Remove the notification
            await notifee.cancelNotification(detail.notification.id);
          }
        }
        break;
    }
  });
};

export { onBackgroundNotifications, onForegroundDownloadFile };
