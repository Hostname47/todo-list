import { SWITCH_MESSAGE_STATUS } from "./messageActionTypes";

export const switchMessageStatus = (status, message, messageType='regular') => {
  return {
    type: SWITCH_MESSAGE_STATUS,
    status,
    messageType,
    message
  }
}