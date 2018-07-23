export const getUser = state => state.user;
export const getRooms = state => state.chatrooms;
export const getMessages = state => id => state.chatmessages[id];
