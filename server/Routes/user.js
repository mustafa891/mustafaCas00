const express = require("express")
const router = express.Router();
const { loginUser, registerUser, profileUser, getUserBalance, setUserCrypto } = require("../controllers/userController");

// LOGIN user 
router.post('/register', registerUser);
router.post("/login", loginUser);
router.post('/profile', profileUser)
router.post('/balance', getUserBalance)
router.post('/setCrypto', setUserCrypto)



module.exports = router;