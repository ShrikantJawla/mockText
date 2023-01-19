const { connect } = require('mongoose')


module.exports = async () => connect(process.env.MONGO_URL)