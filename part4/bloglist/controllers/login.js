const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/User")

//Login
loginRouter.post("/", async (request, response) => {
    try {

        const { username, password } = request.body

        const user = await User.findOne({username})

        const passwordCorrect = user === null 
        ? false 
        : await bcrypt.compare(password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return response.status(401).json({msg : "invalid username or password"})
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        return response.status(200).json({token, username: user.username, name: user.name})

    } catch (error) {
        response.status(400).json(error)
    }
})


module.exports = loginRouter