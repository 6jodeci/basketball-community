import { Router } from 'express'
import { createPost } from '../controllers/post.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

// Создание поста 
// http://localhost:3001/api/posts
router.post('/posts', checkAuth, createPost)

export default router