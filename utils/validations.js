module.exports.verifyName = (name) => {
    if (!name || name.length === 0) {
        throw new Error('Please provide valid name')
    }
    else if(name.length >=50){
        throw new Error('Name limit exceeded')
    }
}

module.exports.verifyBio = (bio) => {
    if (!bio || bio.length === 0) {
        throw new Error('Please provide valid name')
    }
    else if(bio.length >=300){
        throw new Error('Bio lengeth exceeded!')
    }
}
module.exports.verifyLocation = (location) => {
    if (!location || location.length === 0) {
        throw new Error('Please provide valid location')
    }
    else if(location.length >=30){
        throw new Error('Location lengeth exceeded!')
    }
}
module.exports.verifyWebsite = (website) => {
    const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (!website || website.length === 0) {
        throw new Error('Please provide valid website')
    }
    else if(!regexp.test(website)){
        throw new Error('Invalid website provided!')
    }
    return true;
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
        .match(
            /^[a-zA-Z0-9_-]{3,16}$/
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
module.exports.isEmpty= (obj)=> {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }