import { Schema, model, models } from "mongoose";

const devLogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    tags: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

devLogSchema.index({
  project: 1,
  createdAt: -1,
});

devLogSchema.index({
  author: 1,
  createdAt: -1,
});

export const DevLog =
  models.DevLog || model("DevLog", devLogSchema);