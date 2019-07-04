import { noticeConstants } from '../constants';
import { common } from '../utils/common';

const initialState = {
  notifications: [],
};

export function notification(state = initialState, action) {
  const { type, ...notice } = action;
  let notifications = null;
  let item = null;
  switch (type) {
    case noticeConstants.SHOW_NOTIFICATION:
      notifications = [].concat(state.notifications);
      notifications.push(notice);
      return {
        ...state,
        notifications,
      };
    case noticeConstants.DELETE_NOTIFICATION:
      notifications = [].concat(state.notifications);
      item = common.getFromJsonList(notifications, 'id', action.id);
      if (item) {
        const index = notifications.indexOf(item);
        notifications.splice(index, 1);
      }
      return {
        ...state,
        notifications,
      };
    case noticeConstants.READED:
        notifications = [].concat(state.notifications);
        item = common.getFromJsonList(notifications, 'id', action.id);
        if (item) {
          item.readed = true;
        }
        return {
          ...state,
          notifications,
        };
    default:
      return state
  }
}
