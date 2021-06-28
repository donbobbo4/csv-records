const utils = require('../utils/parser');
module.exports = {

  async getRecords(req, res, next) {
    try {
      console.log(req.params.sortType);
      let data = await utils.readCsv(req.params.sortType);
      res.status(200).send(data);
    } catch (e) {
      next(e)
    }
  },
 async postRecords(req, res, next) {
    try {
      //console.log(req.params.sortType);
      let record = {
        //LastName,FirstName,Email,FavoriteColor,DateOfBirth
        lastName = req.body.lastName,
        firstName = req.body.firstName,
        email = req.body.email,
        favoriteColor = req.body.favoriteColor,
        dateOfBirth = req.body.dateOfBirth
      }
      utils.insertRecord(record);
      res.status(200).send(data);
    } catch (e) {
      next(e)
    }
  }
}
