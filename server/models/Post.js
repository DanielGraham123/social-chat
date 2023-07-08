import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    images: {
        type: Array,
        default: [],
    },
    likes: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: [],
    },
},
    { timestamps: true }
)

const Post = model('Post', PostSchema);

export default Post;