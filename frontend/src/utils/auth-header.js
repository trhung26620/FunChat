export default function authHeader() {
    const userData = localStorage.getItem('user')
    if (userData) {
        const token = JSON.parse(userData)?.token
        if (token) {
            return { 'x-access-token': token };
        } else {
            return {};
        }
    } else {
        return {};
    }


}