import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const categorySchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
