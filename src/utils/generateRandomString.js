const generateRandomString = (length) => {
    let str = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let i = 0;
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * length));
    }
    return str;
}

export default generateRandomString;