const jwt = require("jsonwebtoken")
const Playngo = require("../models/playngoModel")
const User = require("../models/userModel")

const saveCasino = async (req, res) => {
    const data = req.body
    
   const {authorization} = req.headers

   if(!authorization) {
     return res.status(401).json({error: "Authorization token is required"})
   }

   // verify token 
   const token = authorization.split(" ")[1]
   const {_id} = await jwt.verify(token, "1kjwdhwd287812wd")

   const user = await User.findOne({_id}) 
   console.log( (data.bet * 10))
    // decrease user balance 
     await User.updateOne({_id}, {
        balance : ((user.balance / 100) - (data.bet)) * 100,
    });

    // when user won : save data and increase user balance
    if(data.winValue != 0 ) {
        // decrease user balance 
         await User.updateOne({_id}, {
            // ((balance / 100) + (0.1)) * 100
            balance : (((user.balance / 100) + (data.winValue) ) * 100 ) -20
        });

        const saveData = await Playngo.create({
        user_id: _id,
        ...data,
         })

    }

    console.log(data)
    res.json({data})
}

module.exports = {saveCasino}