import { noticeConstants } from '../constants';

export const addNotification = (notification) => ({
  type: noticeConstants.SHOW_NOTIFICATION,
  id: notification.id,
  title: notification.title,
  description: notification.description,
  actions: notification.actions,
});

export const deleteNotification = (id) => ({
  type: noticeConstants.DELETE_NOTIFICATION,
  id: id,
});

export const notificationReaded = (id) => ({
  type: noticeConstants.READED,
  id: id,
});
