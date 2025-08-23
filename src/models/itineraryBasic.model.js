// Defines the schema for a travel itinerary, linking it to the agent who created it.


import mongoose, { Schema } from "mongoose";

const ItineraryBasicSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        destination: {
            type: String,
            required: true,
        },
        customer: {
            name: { type: String, required: true },
            email: { type: String, required: true },
        },
        duration: {
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
        },
        details: {
            type: String, // Can be Markdown or JSON for a rich editor
            required: true,
        },
        // Ownership link
        agent: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const ItineraryBasic = mongoose.model("ItineraryBasic" , ItineraryBasicSchema);