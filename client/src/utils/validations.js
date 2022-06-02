export const verifyName = (name) => {
    if (!name || name.length === 0) {
        throw new Error('Please provide valid name')
    }
}

export const verifyEmail = (email) => {
    const is_valid_email = String(email)
        .toLowerCase()
        .match(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        );
    if (!is_valid_email) throw new Error('Invalid email provided')
    return true;
}
export const verifyUsername = (username) => {
    const is_valid_username = String(username)
        .match(
            /^[a-zA-Z0-9_-]{3,16}$/
        );
    if (!is_valid_username) throw new Error('Invalid username provided')
}
export const verifyPassword = (password, confPassword) => {
    if (password !== confPassword) {
        throw new Error('Password does not match');
    }
    return true;

}