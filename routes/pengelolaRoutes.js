const express = require('express')
const router = express.Router()
const pengelolaController = require('../controller/pengelolaController')
const multer = require('multer')
const path = require('path')
const verifyToken = require('../middleware/authMiddleware')


const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'public/uploads/wisata')
    },
    filename: function(req,file,cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage:storage})

router.post('/tambah-wisata', 
    verifyToken, 
    upload.fields([
        {name: 'wisataImages', maxCount: 6},
        {name: 'wisataImage', maxCount: 1}
    ]), 
    pengelolaController.registerWisata
)
router.get('/getWisata',
    verifyToken,
    pengelolaController.getWisata
)
router.patch('/updateWisata', 
    verifyToken,
    upload.fields([
        {name: 'wisataImages', maxCount: 6},
        {name: 'wisataImage', maxCount: 1}
    ]), 
    pengelolaController.updateWisata
)
module.exports = router