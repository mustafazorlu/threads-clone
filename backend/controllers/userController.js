import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username })
            .select("-password")
            .select("-updatedAt");

        if (!user)
            return res.status(400).json({ message: "böyle bir kullanıcı yok" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
        const userToModify = await User.findById(id); //current user
        const currentUser = await User.findById(req.user._id); //istek atılan kullanıcı

        if (id === req.user._id) {
            //bu iki değer aynıysa
            return res
                .status(400)
                .json({ message: "you cannot follow/unfollow yoursel" });
        }

        if (!userToModify || !currentUser) {
            //kullanıcı yok
            return res.status(400).json({ message: "user not found" });
        }

        const isFollowing = currentUser.following.includes(id); //şuan ki kullanıcının içerisinde current user id varsa isfallowing true

        if (isFollowing) {
            await User.findByIdAndUpdate(id, {
                $pull: { followers: req.user._id },
            });
            await User.findByIdAndUpdate(req.user_.id, {
                $pull: { following: id },
            });
            res.status(200).json({ message: "user unfollowed succesfully" });
        } else {
            await User.findByIdAndUpdate(id, {
                $push: { followers: req.user._id },
            });
            await User.findByIdAndUpdate(req.user_.id, {
                $push: { following: id },
            });
            res.status(200).json({ message: "user followed succesfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { name, email, username, password, profilePic, bio } = req.body;
    const userId = req.user._id;

    try {
        let user = await User.findById(userId);

        if (!user)
            return res.status(400).json({ message: "böyle bir kullanıcı yok" });

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();

        res.status(200).json({ message: "profile updated", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    signupUser,
    loginUser,
    logoutUser,
    followUnFollowUser,
    updateUser,
    getUserProfile,
};
