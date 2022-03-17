const {failResponce, successResponce} = require('../Utilities/dbHelper')
const {GetAccByUserAndGroups, InsertGroupIntoAcc} = require('../model/AccModel')


async function GetAccIndex(req, res) {
    const {user_Id} = req;
    const foundTutorials = await GetAccByUserAndGroups(user_Id);
  
    return foundTutorials === false
      ? failResponce(res)
      : successResponce(res, foundTutorials);
  }

  async function InsertGroups(req, res) {
    const user_id = req.user_Id;
    const {group_id} = req.body;
    const foundTutorials = await InsertGroupIntoAcc(group_id, user_id);
  
    return foundTutorials === false
      ? failResponce(res)
      : successResponce(res, foundTutorials);
  }
  

module.exports = {
    GetAccIndex,
    InsertGroups
}