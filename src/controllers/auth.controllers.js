const UserModel = require('../models/auth.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.send('Please fill all the required fields')
    }
    try {
        let existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                status: 0,
                message: 'Not allowed!'
            })
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await UserModel.create({ email, password: hash })
        res.status(201).send({
            status: 1,
            message: 'User created',
            user: { email: newUser.email }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 0,
            message: error.message,
        })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing = await UserModel.findOne({ email });
        const validate = await bcrypt.compare(password, existing.password)
        if (validate) {
            const token = jwt.sign({ id: existing._id, email: existing.email }, process.env.SECRET, { expiresIn: '7 days' })
            res.status(200).send({
                status: 1,
                message: 'Login successful',
                token
            })
        } else {
            res.status(401).send({
                status: 0,
                message: 'Wrong credentials!'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 0,
            message: error.message,
        })
    }
}

module.exports = { signup, login }