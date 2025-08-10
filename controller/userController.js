const { User } = require('../models')

//PROTECTED
const getProtected = async(req, res) => {
    try {
        const username = req.user.username
        const data = await User.findOne({where: {username: username}})
        res.json({
            message:"Your data",
            data: data
        })
    } catch {
        res.json({message:err.message})
    }
}

//READ all USER
const getAllUser = async(req,res) => {
    try {
        const user = await User.findAll()
        res.json({
            message:"Success fetch data",
            data: user
        })
    } catch (err) {
        res.json({message:err.message})
    }
}

module.exports = {
    getProtected,
    getAllUser
}