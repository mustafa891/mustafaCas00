const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const Schema =  mongoose.Schema

const userSchema = new Schema({

	username: {
		type : String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,

	},

	password: {
		type: String,
		required: true,
	},

	balance : {
		type: Number,
		required: true,
	},

	isVerify : {
		type: Boolean,
		default: false,
	}

}, {timestamps: true})

// static register methos 
// this = User 
userSchema.statics.register = async function (username, email, password, balance) {
	
	// validation
	if(!username || !email || !password) throw Error("All fields must be filled ")
	if(!validator.isEmail(email)) throw Error("Email is not valid")
	if(!validator.isStrongPassword(password)) throw Error("Password is not strong enough")

	const exists = await this.findOne({email})

	if(exists) {
		throw Error("Email already in use")
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)

	const user = await this.create({username, email, password: hash, balance})

	return user._doc;
}

// static login method 

userSchema.statics.login = async function (email, password) {

	if(!email || !password) throw Error("All fields must be filled ")

	const user = await this.findOne({email})
	
	if(!user) {
		throw Error("Incorect Email or Password")
	}

	const match = await bcrypt.compare(password, user.password)

	if(!match) {
		throw Error("Incorect Email or Password")
	}

	return user
}

module.exports = mongoose.model("User", userSchema);