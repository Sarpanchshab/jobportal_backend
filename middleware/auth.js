const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')

const checkUserAuth = async (req, res, next) => {
   //console.log('hello auth')
   const { token } = req.cookies
   // console.log(token)
   if (!token) {
      res.status(401).json({ status: "failed", message: "Unauthorised Login" })
   }
   else {
      const data = jwt.verify(token, "jaishreeram")
     // console.log(data) //object id uth ke aayegi kyuki object id se hi bana tha token
     const userdata = await UserModel.findOne({ _id: data.Id })
      //console.log(userdata)//saara data uth ke aajayega
      req.userdata = userdata
      next() //wapaas chla jayega
   }
}

module.exports = checkUserAuth