import User from "../models/User.js"
import bcrypt from 'bcryptjs'
// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.status(402).json({
                message: "this username already in used"
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username, password: hash,
        })

        await newUser.save()

        res.json({
            newUser, message: 'successfully registrated'
        })

    } catch (error) {
        res.json({ message: 'failed to create user' })
    }
}
// Login user
export const login = async (req, res) => {
    try {

    } catch (error) {

    }
}
// GetMe user
export const getMe = async (req, res) => {
    try {

    } catch (error) {

    }
}