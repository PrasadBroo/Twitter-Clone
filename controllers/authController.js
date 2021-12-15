const {
    getGoogleAccessTokenFromCode,
    getGoogleUserInfo
} = require("../services/googleAuthService");




module.exports.googleLoginAuthentication = async (req, res, next) => {
    // check code
    // make request
    // send response jwt

    const {
        code
    } = req.body;

    try {
        if (!code) {
            return res.status(400).send({
                error: 'invalid google auth code,try again'
            })
        }
        const userAccessToken = await getGoogleAccessTokenFromCode(code)
        const userinfo = await getGoogleUserInfo(userAccessToken);
        return res.status(200).json(userinfo);
    } catch (error) {
        return next(error)
    }
}