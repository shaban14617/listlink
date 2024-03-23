const { Schema, models, model } = require("mongoose");

const EventSchema = new Schema(
  {
    type: String, //click or view
    page: String,
    uri: String, // /ahmed | links
  },
  { timestamps: true }
);

export const Event = models?.Event || model("Event", EventSchema);
