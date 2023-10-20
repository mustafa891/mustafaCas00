const express = require("express")
const router = express.Router();
const User = require("../models/userModel");
const { login } = require("../controllers/userController");

// LOGIN user 
router.post("/users/login", login);

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