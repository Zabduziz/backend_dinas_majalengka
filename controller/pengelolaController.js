const {Pengelola, Wisata, GaleriWisata} = require('../models')
const idGenerator = require('../helper/userIdGenerator')

//REGISTER WISATA
const registerWisata = async (req, res) => {
    const body = req.body
    const filesGambar = req.files 
    if(req.user.id_role != 'PNGL') {
        return res.status(401).json({message:"Lu bukan Pengelola"})
    }
    if(!filesGambar || filesGambar.length === 0) {
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
            harga_tiket: body.harga_tiket
        })

        // FIXED: Use Promise.all with async map to generate a unique ID for each image
        const galeriData = await Promise.all(filesGambar.map(async (file) => {
            const newGaleriId = await idGenerator.generateGaleriWisataId(); // New ID for each image
            return {
                id_galery_wisata: newGaleriId,
                id_wisata: wisata.id_wisata,
                url_gambar: file.path
            };
        }));

        await GaleriWisata.bulkCreate(galeriData)

        res.json({
            message:"Daftar Wisata Berhasil",
            data:wisata, 
            message: `${filesGambar.length} gambar berhasil ditambahkan ke galeri wisata`
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = {registerWisata}