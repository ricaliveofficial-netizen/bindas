const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload folder serve
app.use('/uploads', express.static('uploads'));

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log(err));


// ============== SIGNUP ==============
app.post("/signup", upload.single("profilePic"), async (req, res) => {
    const { name, email, country, gender, dob, password } = req.body;

    let pic = "assets/default-avatar.png";
    if (req.file) pic = "/uploads/" + req.file.filename;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({
            name,
            email,
            country,
            gender,
            dob,
            password: hashedPassword,
            profilePicture: pic
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User Registered!",
            userId: user.userId
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Signup Failed" });
    }
});


// ============== LOGIN ==============
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ success: false, message: "User Not Found!" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ success: false, message: "Wrong Password!" });

        res.json({
            success: true,
            message: "Login Success",
            userId: user.userId,
            name: user.name,
            profilePicture: user.profilePicture
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Login Error" });
    }
});


// Server Run
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running: ${PORT}`));