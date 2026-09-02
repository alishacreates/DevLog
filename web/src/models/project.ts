import { Schema, model, models } from "mongoose";

export const PROJECT_STATUSES = [
  "planning",
  "in-progress",
  "completed",
] as const;

const projectSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: PROJECT_STATUSES,
      default: "planning",
    },

    techStack: {
      type: [String],
      default: [],
    },

    githubUrl: {
      type: String,
      default: "",
      trim: true,
    },

    liveUrl: {
      type: String,
      default: "",
      trim: true,
    },

    contributors: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index(
  {
    owner: 1,
    slug: 1,
  },
  {
    unique: true,
  }
);

projectSchema.index({
  createdAt: -1,
});

projectSchema.index({
  status: 1,
});

export const Project =
  models.Project || model("Project", projectSchema);