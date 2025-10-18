import mongoose, { model, Schema } from "mongoose";
mongoose.connect("mongodb+srv://admin:ZcYrde7MgJAQshOt@cluster0.oqfmasw.mongodb.net/");
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});
export const UserModel = model("User", UserSchema);
//# sourceMappingURL=db.js.map