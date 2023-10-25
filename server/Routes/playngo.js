const express = require("express");
const router = express.Router()

const {saveCasino} = require("../controllers/playngoController") 

// save user data 
router.post("/saveCasino", saveCasino)


module.exports = router;