const express = require("express")
const router = express.Router();
const User = require("../models/userModel");


// LOGIN user 
router.post("/users/login", async (req, res) => {

  const {username, password} = req.body
  
		  const user = await User.exists({username:username, password: password})
			  if(user) {
			  	  const userData = await User.findById({_id: user._id})
						return res.status(200).json({
			  			data : {
			  				user : {...userData._doc}
			  			}
			  	 })  	
			  }else {

			  res.status(400).json({
			  		data : {
			  			message : "Invalid username & password",
			  		}
			  })
			  
			 }	  
   		

});


router.post('/users/register', async (req, res) => {


	// if need validation for data, we do it later 

	// 
		try {

		const user = await User.create({...req.body})

		res.status(200).json(user)

		} catch (error) {
			return res.status(400).json({error: error.message})
		}
});



module.exports = router;