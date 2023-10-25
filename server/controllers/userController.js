const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
   return jwt.sign({_id}, "1kjwdhwd287812wd", {expiresIn: "3d"})
}

// login user 
const loginUser = async (req, res) => {
   const {email, password} = req.body

   try {
      const user = await User.login(email, password);

      if(!user.isVerify) {
         throw Error("Your account is not verify");
      }

      // create a token 
      const token = createToken(user._id)
         
      res.status(200).json({data: {
         user: {
            username : user.username,
            email : user.email,
            balance : user.balance,
            isVerify : user.isVerify,
         },
         token : token,
         message: "You successfully registered"
      }})

   } catch (error) {
       res.status(400).json({message: error.message})
   }
}

// register user
const registerUser = async (req, res) => {

   const {username, email, password} = req.body;

   try {
     const user = await User.register(username, email, password, 0) // balance by default is 0 

     // create a token 
     const token = createToken(user._id)

     res.status(200).json({data: {
       email : user.email,
       token : token,
       message: "You successfully registered"
     }})

   } catch (error) {
      res.status(400).json({error: error.message})
   }
}


// profile user 

const profileUser = async (req, res) => {
    const {authorization} = req.headers

    if(!authorization) {
      return res.status(401).json({error: "Authorization token is required"})
    }

    const token = authorization.split(" ")[1]

   //  Verify token
   const {_id} = await jwt.verify(token, "1kjwdhwd287812wd")

   const user = await User.findOne({_id})

   return res.status(200).json({
      data : {
            username: user.username,
            email: user.email,
            balance: user.balance,
            isVerify: user.isVerify,
      }
   })
}

// get user balance 

const getUserBalance = async (req, res) => {
  
   const {authorization} = req.headers

   if(!authorization) {
     return res.status(401).json({error: "Authorization token is required"})
   }

   const token = authorization.split(" ")[1]

  //  Verify token
  const {_id} = await jwt.verify(token, "1kjwdhwd287812wd")

  const user = await User.findOne({_id})

  return res.status(200).json({
     data : {
           balance: user.balance,
     }
  })

}

const setUserCrypto = async (req, res) => {
   res.json({msg : "test"});
}

module.exports = {
	loginUser,
 	registerUser,
   profileUser,
   getUserBalance,
   setUserCrypto
}