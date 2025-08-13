const {User} = require('../models')

//AUTOMATIC GENERATE USERID
const generateUserId = async() => {
    const lastUser = await User.findOne({
        order: [['id_user', 'DESC']]
    })

    let nextIdNumber = 1
    if (lastUser) {
        const lastId = lastUser.id_user
        const lastNumber = parseInt(lastId.replace('USR', ''), 10)
        nextIdNumber = lastNumber + 1
    }
    const formattedNumber = String(nextIdNumber).padStart(4, '0')
    return `USR${formattedNumber}`
}

module.exports = generateUserId