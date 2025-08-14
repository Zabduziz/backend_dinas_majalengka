const {Pengelola, Wisata, GaleriWisata} = require('../models')
const idGenerator = require('../helper/userIdGenerator')

//REGISTER WISATA
const registerWisata = async (req, res) => {
    const body = req.body
    const filesGambar = req.files 
    const wisataImages = filesGambar.wisataImages
    const wisataImage = filesGambar.wisataImage
    if(req.user.id_role != 'PNGL') {
        return res.status(401).json({message:"Lu bukan Pengelola"})
    }
    if(!wisataImages || wisataImages.length === 0) {
        return res.status(400).json({ message: 'Tidak ada gambar yang diunggah.' })
    }
    try {
        const userId = req.user.id_user
        const pengelola = await Pengelola.findOne({where: {id_user: userId}})
        if (!pengelola) {
            return res.status(404).json({ message: "Data pengelola tidak ditemukan." });
        }
        const existingWisata = await Wisata.findOne({ where: { id_pengelola: pengelola.id_pengelola } });
        if (existingWisata) {
            return res.status(400).json({ message: "Pengelola ini sudah mendaftarkan satu tempat wisata." });
        }
        const newWisataId = await idGenerator.generateWisataId()
        const wisata = await Wisata.create({
            id_wisata:newWisataId,
            id_pengelola: pengelola.id_pengelola,
            nama_wisata: body.nama_wisata,
            lokasi: body.lokasi,
            jam_buka: body.jam_buka,
            jam_tutup: body.jam_tutup,
            jam_terbaik: body.jam_terbaik,
            coordinates: {
                type: 'Point',
                coordinates: [body.longtitude, body.latitude]
            },
            fasilitas: body.fasilitas,
            asuransi: body.asuransi,
            harga_tiket: body.harga_tiket,
            url_gambar_utama: wisataImage[0].path
        })

        // FIXED: Hapus panggilan idGenerator.generateGaleriWisataId
        const galeriData = wisataImages.map(file => ({
            id_wisata: wisata.id_wisata,
            url_gambar: file.path
        }));
        
        await GaleriWisata.bulkCreate(galeriData)

        res.json({
            message:"Daftar Wisata Berhasil",
            data:wisata, 
            gambar_utama: `${wisataImage.length} gambar utama berhasil ditambahkan`,
            gambar_galeri: `${wisataImages.length} gambar berhasil ditambahkan ke galeri wisata`
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

//GET WISATA BERDASARKAN PENGELOLA ID
const getWisata = async (req, res) => {
    const idUser = req.user.id_user
    try {
        const pengelola = await Pengelola.findOne({where: {id_user: idUser}})
        if (!pengelola) {
            return res.status(404).json({ message: "Pengelola tidak ditemukan" });
        }
        const wisata = await Wisata.findOne({where:{id_pengelola: pengelola.id_pengelola}})
        const galeriWisata = await GaleriWisata.findAll({where: {id_wisata:wisata.id_wisata}})
        res.status(200).json({
            message:"Data Wisata Berhasil diambil berdasarkan pengelola",
            data: wisata,
            galeri: galeriWisata
        })
    } catch(err) {
        res.json({message:err.message})
    }
}

module.exports = {
    registerWisata,
    getWisata
}