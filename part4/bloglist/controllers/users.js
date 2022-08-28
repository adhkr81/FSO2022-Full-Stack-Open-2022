const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/User")


//Create User
usersRouter.post("/", async (request, response) => {
    
    try{
        const { username, name, password } = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        if (!username || !password) {
            return response.status(400).json({msg: "Username or Password missing"})
        } else if (username.length < 4 || password < 4) {
            return response.status(400).json({msg: "Username or Password must have more then 3 characters"})
        }

        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await user.save()

        return response.status(200).json(savedUser)

    } catch (error) {
        
        return response.status(400).json({msg: "cannot create user"})
    }
})

module.exports = usersRouter