const {findUserWithEmail, CreateUser} = require('../model/userModel')
const {failResponce, successResponce} = require('../Utilities/dbHelper')
const {HidePass, verifyPass, generateJwtToken} = require('../Utilities/helper')

async function registering(req, res) {
    const {full_name, email, password} = req.body;
    const hiddenpassword = HidePass(password);

    const insertResult = await CreateUser(full_name, email, hiddenpassword);
    return insertResult === false
    ? failResponce(res)
    :successResponce(res, 'user has been successfully created')
}

async function loging(req, res) {
    const { email, password } = req.body;

    const findResults = await findUserWithEmail(email);
    console.log('findResults===', findResults);
    if (findResults === false) return failResponce(res);
    if (!findResults.length) return failResponce(res, 'Login failed. Invalid Email and Password combination');
    const UserObj = findResults[0];

    if (!verifyPass(password, UserObj)){
        return failResponce(res, 'Login failed. Invalid Email and Password combination')
    }
    const token = generateJwtToken(UserObj);
    successResponce(res, token);
}



// 'Login failed. Invalid Email and Password combination'
module.exports = {
    registering,
    loging
}