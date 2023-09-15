import { createGlobalState } from "react-hooks-global-state";
import { io } from 'socket.io-client'
const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
    otpModal: 'hidden-modal',
    addFriendModal: 'hidden-modal',
    uploadAvatarModal: 'hidden-modal',
    profileModal: 'hidden-modal',
    currentUser: {},
    contactDataList: [],
    selectedConservation: {},
    conversationMessages: {

    },
    socket: io(process.env.SOCKET_BACKEND_URL || 'ws://localhost:3000'),
})


export { useGlobalState, setGlobalState, getGlobalState }