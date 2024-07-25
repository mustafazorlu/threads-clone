import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

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
            generateTokenAndSetCookie(newUser._id, res);
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

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log(user);

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password || ""
        );

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "user logged out succesfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const followUnFollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id) {
            return res
                .status(400)
                .json({ message: "you cannot follow/unfollow yoursel" });
        }

        if (!userToModify || !currentUser) {
            return res.status(400).json({ message: "user not found" });
        }

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            await User.findByIdAndUpdate(req.user_.id, {
                $pull: { following: id },
            });
            await User.findByIdAndUpdate(id, {
                $pull: { followers: req.user._id },
            });
            res.status(200).json({ message: "user unfollowed succesfully" });
        } else {
            await User.findByIdAndUpdate(req.user_.id, {
                $push: { following: id },
            });
            await User.findByIdAndUpdate(id, {
                $push: { followers: req.user._id },
            });
            res.status(200).json({ message: "user followed succesfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { signupUser, loginUser, logoutUser, followUnFollowUser };
