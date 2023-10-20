const User = require("../models/userModel")

// LOGIN user 
const login = async (req, res) => {
 
 	const {email, password} = req.body
 	console.log(email, password)

   const isUserExist = await User.exists({email: email, password: password})
   console.log(isUserExist)
   if(isUserExist) {
   	console.log("Im here")
   	   const user = await User.findById({_id: isUserExist._id})
   	  // Response user data here 
   	  return res.status(200).json({
   	  	 data : {
   	  	 	user: user,
            message: "You logged in !"
   	  	 }
   	  })
   } 
   		res.status(404).json({
   			data : {
   				message : "invalid username and password",
   			}
   		})
   
}


module.exports = {
	login
}