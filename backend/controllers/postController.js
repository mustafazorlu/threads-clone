import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;

        if (!postedBy || !text || !img) {
            return res
                .status(400)
                .json({ message: "posted by and text are rquired" });
        }

        const user = await User.findById(postedBy);

        if (!user) return res.status(400).json({ message: "user not found" });

        if (user._id.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({ message: "unauthorized to create post" });
        }

        const maxLength = 500;

        if (text.length > maxLength) {
            return res
                .status(401)
                .json({ message: "text must be less than 500 characters" });
        }

        const newPost = new Post({
            postedBy,
            text,
            img,
        });

        await newPost.save();

        res.status(200).json({ message: "success", newPost });
    } catch (error) {
        res.status(400).json({ message: "bir hata oluştu" });
    }
};

const getPost = async (req, res) => {
    console.log(req.params.id);
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(400).json({ message: "post bulunamadı try" });
        }

        res.status(200).json({ post });
    } catch (error) {
        res.status(400).json({ message: "post bulunamadı catch" });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ message: "post bulunamadı try" });
        }
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({ message: "unauthorized to delete post" });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "silindi" });
    } catch (error) {
        res.status(400).json({ message: "silinemedi" });
    }
};

export { createPost, getPost, deletePost };
