import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ message: 'user doesn\'t exist' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({ message: 'incorrect password' })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.TOKEN_SYMMETRIC_KEY,
            { expiresIn: process.env.TOKEN_EXPIRES })

        res.json({ token, user, message: 'You successfully log in' })
    } catch (error) {
        res.json({ message: 'failed to login user' })
    }
}
// GetMe user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({ message: 'user doesn\'t exist' })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.TOKEN_SYMMETRIC_KEY,
            { expiresIn: process.env.TOKEN_EXPIRES })

        res.json({ token, user })
    } catch (error) {
        res.json({ message: 'no access' })
    }
}