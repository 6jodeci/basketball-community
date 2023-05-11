import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SYMMETRIC_KEY)

            req.usedId = decoded.id
            
            next()
        } catch (error) {
            return res.json({ message: 'no access' })
        }
    } else {
        return res.json({ message: 'no access' })
    }
}