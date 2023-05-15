import Post from '../models/Post.js'
import User from '../models/User.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Создание поста
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findById(req.userId)

        if (req.files) {
            let filename = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', filename))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imageUrl: filename,
                author: req.userId,
            })
            await newPostWithImage.save()
            await User.findOneAndUpdate(req.userId, {
                $push: { posts: newPostWithImage }
            })
            return res.json(newPostWithImage)
        }

        const newPostWithOutImage = new Post({
            username: user.username,
            title,
            text,
            imageUrl: '',
            author: req.userId,
        })
        await newPostWithOutImage.save()
        await User.findOneAndUpdate(req.userId, {
            $push: { posts: newPostWithOutImage }
        })
        return res.json(newPostWithOutImage)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так' })
    }
}