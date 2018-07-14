export const getUser = state => { return state.user; };
export const getRooms = state => { return state.chatrooms; };
export const getMessage = state => id => state.history.find(msg => msg.id === Number(id)).messages;
