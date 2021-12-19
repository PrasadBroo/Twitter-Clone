module.exports.verifyName = (name) => {
    if (!name || name.length === 0) {
        throw new Error('Please provide valid name')
    }
}

module.exports.verifyEmail = (email) => {
    const is_valid_email = String(email)
        .toLowerCase()
        .match(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        );
    if (!is_valid_email) throw new Error('Invalid email provided')
    return true;
}
module.exports.verifyUsername = (username) => {
    const is_valid_username = String(username)
        .toLowerCase()
        .match(
            /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
        );
    if (!is_valid_username) throw new Error('Invalid username provided')
}
module.exports.verifyPassword = (password, confPassword) => {
    if (password !== confPassword) {
        throw new Error('Password does not match');
    }
    return true;

}
module.exports.verifyAll = (name,email,username,password,confPassword)=>{
    try {
        this.verifyName(name)
        this.verifyEmail(email)
        this.verifyUsername(username)
        this.verifyPassword(password,confPassword)
    } catch (error) {
        throw new Error(error.message)
    }

}