import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return res.status(400).json({ message: "kullanıcı zaten var" });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
        });

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                password: newUser.password,
            });
        } else {
            res.status(400).json({ message: "geçersiz kullanıcı" });
        }

        await newUser.save();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { signupUser };
