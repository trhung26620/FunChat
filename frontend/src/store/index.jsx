import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
    otpModal: 'hidden-modal',
    addFriendModal: 'hidden-modal',
    profileModal: 'hidden-modal',
    currentUser: {}
})


export { useGlobalState, setGlobalState, getGlobalState }