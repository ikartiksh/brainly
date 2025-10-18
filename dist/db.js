import mongoose, { model, Schema } from "mongoose";
mongoose.connect("mongodb+srv://admin:ZcYrde7MgJAQshOt@cluster0.oqfmasw.mongodb.net/");
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});
export const UserModel = model("User", UserSchema);
const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const contentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});
export const ContentModel = model("Content", contentSchema);
//# sourceMappingURL=db.js.map