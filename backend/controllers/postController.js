import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
        let { img } = req.body;

        console.log(postedBy, text);

        if (!postedBy || !text) {
            return res
                .status(400)
                .json({ error: "posted by and text are rquired" });
        }

        const user = await User.findById(postedBy);

        if (!user) return res.status(400).json({ error: "user not found" });

        if (user._id.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({ error: "unauthorized to create post" });
        }

        const maxLength = 500;

        if (text.length > maxLength) {
            return res
                .status(401)
                .json({ error: "text must be less than 500 characters" });
        }

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);

            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            postedBy,
            text,
            img,
        });

        await newPost.save();

        res.status(200).json({ message: "success", newPost });
    } catch (error) {
        res.status(400).json({ error: "bir hata oluştu" });
    }
};

const getPost = async (req, res) => {
    console.log(req.params.id);
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(400).json({ error: "post bulunamadı try" });
        }

        res.status(200).json({ post });
    } catch (error) {
        res.status(400).json({ error: "post bulunamadı catch" });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ error: "post bulunamadı try" });
        }
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({ error: "unauthorized to delete post" });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "silindi" });
    } catch (error) {
        res.status(400).json({ error: "silinemedi" });
    }
};

const likeUnLikePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "post not found" });
        }

        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            res.status(200).json({ message: "post unliked success" });
        } else {
            post.likes.push(userId);
            await post.save();
            res.status(200).json({ message: "post liked success" });
        }
    } catch (error) {}
};

const replyToPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;

        if (!text) {
            res.status(400).json({ error: "text field is rquired" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            res.status(400).json({ error: "post not found" });
        }

        const reply = { userId, text, userProfilePic, username };

        post.replies.push(reply);

        await post.save();

        res.status(200).json({ message: "success", post });
    } catch (error) {
        res.status(500).json({ error: "hata olustu" });
    }
};

const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user_.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const following = user.following;

        const feedPosts = await Post.find({
            postedBy: { $in: following },
        }).sort({ createdAt: -1 });

        res.status(200).json({ feedPosts });
    } catch (error) {
        res.status(500).json({ error: "hata olustu" });
    }

    //3:24:00
};

export {
    createPost,
    getPost,
    deletePost,
    likeUnLikePost,
    replyToPost,
    getFeedPosts,
};
