const getCurrentUserId = () => {
    const userData = localStorage.getItem('user')
    if (userData) {
        const userId = JSON.parse(userData)?.id
        if (userId) {
            return userId;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export {
    getCurrentUserId
}
