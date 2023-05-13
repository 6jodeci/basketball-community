import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.json({
                message: 'Имя пользователя уже используется',
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.TOKEN_SYMMETRIC_KEY,
            { expiresIn: process.env.TOKEN_EXPIRES },
        )

        await newUser.save()

        res.json({
            newUser,
            token,
            message: 'Регистрация прошла успешно',
        })
    } catch (error) {
        res.json({ message: 'Ошибка при создании пользователя' })
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ message: 'Пользователь не существует' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({ message: 'Неверное имя пользователя или пароль' })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.TOKEN_SYMMETRIC_KEY,
            { expiresIn: process.env.TOKEN_EXPIRES })

        res.json({ token, user, message: 'Вы успешно вошли' })
    } catch (error) {
        res.json({ message: 'Ошибка авторизации пользователя' })
    }
}
// GetMe user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({ message: 'Пользователя не существует' })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.TOKEN_SYMMETRIC_KEY,
            { expiresIn: process.env.TOKEN_EXPIRES })

        res.json({ token, user })
    } catch (error) {
        res.json({ message: 'Нет доступа' })
    }
}