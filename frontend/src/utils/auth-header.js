export default function authHeader() {
    const userData = localStorage.getItem('user')
    console.log("🚀 ~ file: auth-header.js:4 ~ authHeader ~ userData:", userData)
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