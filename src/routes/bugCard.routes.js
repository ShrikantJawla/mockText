const { Router } = require("express");
const BugCardModel = require('../models/bugCard.model')
const middleware = require('../middlewares/checkloginMiddleware')

const router = Router();
router.use(middleware)


router.post('/addbug', async (req, res) => {
    const { text, status } = req.body;
    if (!status) {
        return res.status(500).send({
            status: 0,
            message: 'Please send any status of bug'
        })
    }
    try {
        const newBug = await BugCardModel.create({ text, status })
        res.status(200).send({
            staus: 1,
            message: 'Bug has been created successfully!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 0,
            message: error.message,
        })
    }
})

router.patch('/update/:id', async (req, res) => {
    const { status, text } = req.body;
    const bugId = req.params.id;
    try {
        const updatedBug = await BugCardModel.updateOne({ _id: bugId }, { $set: { status, text } })
        res.status(200).send({
            status: 1,
            message: 'Status has been updated successfully!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 0,
            message: error.message,
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
    const bugId = req.params.id;
    try {
        await BugCardModel.findByIdAndDelete(bugId)
        res.status(200).send({
            status: 1,
            message: 'Bug has been deleted successfully!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 0,
            message: error.message,
        })
    }
})


module.exports = router