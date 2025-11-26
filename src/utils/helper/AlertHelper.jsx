import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export function SuccessAlert(message) {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    textBody: message,
  });
}

export function ErrorAlert(message) {
  Toast.show({
    type: ALERT_TYPE.ERROR,
    textBody: message,
  });
}

export function WarningAlert(message) {
  Toast.show({
    type: ALERT_TYPE.WARNING,
    textBody: message,
  });
}