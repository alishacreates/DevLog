import { Schema, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    devLog: {
      type: Schema.Types.ObjectId,
      ref: "DevLog",
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({
  devLog: 1,
  createdAt: -1,
});

export const Comment =
  models.Comment || model("Comment", commentSchema);