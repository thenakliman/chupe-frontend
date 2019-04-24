export const NotificationType = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
};

export const CREATE_FEEDBACK_LOADER_ID = "CREATE_FEEDBACK_LOADER_ID";

export const CREATE_FEEDBACK_NOTIFICATION = {
  id: "CREATE_FEEDBACK_NOTIFICATION_ID",
  type: NotificationType.ERROR,
  message: "Unable to give feedback. Please try after sometime."
}