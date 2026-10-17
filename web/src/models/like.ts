import { Schema, model, models } from "mongoose";

const likeSchema = new Schema(
  {
    user: {
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
  },
  {
    timestamps: true,
  }
);

likeSchema.index(
  {
    user: 1,
    devLog: 1,
  },
  {
    unique: true,
  }
);

export const Like =
  models.Like || model("Like", likeSchema);