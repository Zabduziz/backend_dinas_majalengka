const { User, Role_User, Role } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SECRET_KEY = "rahasia-super-aman"

//REGISTER
const register = async(req, res) => {
    const body = req.body;
    
    const hashedPassword = await bcrypt.hash(body.password_hash, 10);
    try {
        const user = await User.create({ 
            id_user:body.id_user,
            nama_lengkap:body.nama_lengkap,
            email:body.email,
            tanggal_lahir:body.tanggal_lahir,
            no_telpon:body.no_telpon,
            gender:body.gender,
            password_hash:hashedPassword
        });
        const id_role = "usr"
        const user_role = await Role_User.create({
            id_user:body.id_user,
            id_role:id_role
        })
        res.json({ message: "Register berhasil", table_user: user, table_role:user_role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//LOGIN
const login = async(req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ 
            where: { email },
            include: [
                {
                    model: Role,
                    through: {attributes:[]},
                    as: 'roles'
                }
            ]
        });
        if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(401).json({ message: "Password salah" });
    
        const payload = {
            id_user: user.id_user,
            id_roles: user.roles[0].id_role,
            nama_lengkap: user.nama_lengkap,
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    
        res.json({ message: "Login berhasil", token });
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    register,
    login
}