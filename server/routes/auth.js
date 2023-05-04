import { Router } from 'express'
import { register, login, getMe } from '../controllers/auth.js'

const router = new Router()

// Register 
router.post('/register', register)
// Login
router.post('/login', login)
// GetMe
router.get('/me', getMe)
export default router