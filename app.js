require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const port = process.env.PORT || 5050

app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.json({
        message:'Berhasil'
    })
})

//AUTH
app.use('/auth', authRoutes)

//USER
app.use('/user', userRoutes)

//INTENT TO GOOGLE MAP
app.post('/get', (req,res) => {
    const body = req.body
    if (!body.alamat) {
        return res.status(400).json({
            message:"Tolong map nya diisi"
        })
    }
    const formattedAlamat = encodeURIComponent(body.alamat)
    const googleMapsUrl = `http://maps.google.com/maps?q=${formattedAlamat}`
    res.json({
        maps:googleMapsUrl
    })
})

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})