const jwt = require('jsonwebtoken')

const checkLoginMiddleware = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).send({
        status: 0,
        message: 'token is not sent'
    })
    try {
        const validate = jwt.verify(token, process.env.SECRET);
        if (!validate) {
            return res.status(401).send({
                status: 0,
                message: 'Expired token!'
            })
        }
        req.userId = validate._id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 0,
            message: error.message,
        })
    }
}

module.exports = checkLoginMiddleware