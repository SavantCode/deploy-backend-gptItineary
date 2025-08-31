import mongoose, { Schema } from 'mongoose';

// =================================================================
// --- SUB-SCHEMAS (Reusable Components for the Main Schema) ---
// =================================================================

const PriceRowSchema = new Schema({
    id: { type: String, required: true },
    paxType: { type: String },
    noOfPax: { type: Number },
    costPerPerson: { type: Number },
}, { _id: false });

const BankDetailsSchema = new Schema({
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
}, { _id: false });

const PricingPackageSchema = new Schema({
    id: { type: String, required: true },
    packageName: { type: String },
    inclusions: { type: String },
    priceDetails: [PriceRowSchema],
    totalCost: { type: Number },
}, { _id: false });

const ArrivalDepartureSchema = new Schema({
    id: { type: Schema.Types.Mixed, required: true },
    modeOfTravel: { type: String },
    fromCity: { type: String },
    toCity: { type: String },
    airline: { type: String },
    airport: { type: String },
    date: { type: String },
    flightNo: { type: String },
    time: { type: String },
}, { _id: false });

const TripInfoSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String },
    content: { type: String },
}, { _id: false });

const HotelSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String },
    location: {
        country: { type: String },
        city: { type: String },
    },
    rating: { type: Number },
    images: [String],
    description: { type: String },
    amenities: [String],
    price_per_night: { type: Number },
    available_rooms: { type: Number },
}, { _id: false });

const AccommodationBookingSchema = new Schema({
    id: { type: String, required: true },
    bookedAt: { type: Date },
    checkInDate: { type: String },
    checkOutDate: { type: String },
    numRooms: { type: Number },
    remark: { type: String },
    hotel: HotelSchema,
    roomDetails: [{
        _id: false,
        roomType: { type: String },
        mealType: { type: String },
    }],
}, { _id: false });

const MealSchema = new Schema({
    id: { type: Schema.Types.Mixed, required: true },
    type: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'] },
    location: { type: String },
    inclusions: { type: String },
    mealIncluded: { type: Boolean },
    image: { type: String },
}, { _id: false });

const SightseeingSchema = new Schema({
    id: { type: Schema.Types.Mixed, required: true },
    name: { type: String },
    time: { type: String },
    description: { type: String },
    image: { type: String },
    imageLayout: { type: String, enum: ['cover', 'contain'], default: 'cover' },
    ticketsIncluded: { type: Boolean },
}, { _id: false });

const TransferSchema = new Schema({
    id: { type: Schema.Types.Mixed, required: true },
    from: { type: String },
    to: { type: String },
    mode: { type: String },
    pickupTime: { type: String },
}, { _id: false });

const DayPlanSchema = new Schema({
    id: { type: Schema.Types.Mixed, required: true },
    date: { type: Date },
    title: { type: String },
    description: { type: String },
    image: { type: String },
    imageLayout: { type: String, enum: ['cover', 'contain'], default: 'cover' },
    remark: { type: String },
    activeTab: { type: String },
    sightseeing: [SightseeingSchema],
    meals: [MealSchema],
    transfers: [TransferSchema],
}, { _id: false });

const VehicleSchema = new Schema({
    id: { type: String, required: true },
    driveType: { type: String },
    vehicleType: { type: String },
    vehicleBrand: { type: String },
    vehicleNumber: { type: String },
    numVehicles: { type: Number },
    pickUpDate: { type: String },
    pickUpTime: { type: String },
    pickUpLocation: { type: String },
    dropOffDate: { type: String },
    dropOffTime: { type: String },
    dropOffLocation: { type: String },
    remark: { type: String },
}, { _id: false });


// =================================================================
// --- MAIN ITINERARY SCHEMA ---
// =================================================================
const ItineraryBasicSchema = new Schema(
    {
        itineraryId: { 
            type: String, 
            required: [true, 'A custom itinerary ID is required.'], 
            unique: true, 
            index: true 
        },
        agent: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        status: { 
            type: String, 
            enum: ['draft', 'published', 'booked', 'cancelled'], 
            default: 'draft' 
        },
        customer: { 
            name: String, 
            email: String, 
            phone: String, 
            nationality: String 
        },
        banner: { 
            title: String, 
            description: String, 
            image: String, 
            imageLayout: { type: String, enum: ['cover', 'contain'] } 
        },
        travelBasics: { 
            startDate: String, 
            endDate: String, 
            totalTravelers: Number, 
            totalDays: Number, 
            tripOverviewTitle: String, 
            tripOverviewDetails: String 
        },
        days: { 
            type: [DayPlanSchema], 
            default: [] 
        },
        accommodation: { 
            type: [AccommodationBookingSchema], 
            default: [] 
        },
        arrivalDeparture: { 
            type: [ArrivalDepartureSchema], 
            default: [] 
        },
        selectedVehicles: { 
            type: [VehicleSchema], 
            default: [] 
        },
        pricingDetails: { 
            bankDetails: BankDetailsSchema, 
            paymentMethods: String, 
            paymentTerms: String, 
            pricingPackages: [PricingPackageSchema] 
        },
        tripInformation: { 
            type: [TripInfoSchema], 
            default: [] 
        }
    },
    {
        timestamps: true,
    }
);

// ✅ RENAMED: The schema is now named 'ItineraryBasicSchema' for clarity
// and the final exported model is 'ItineraryBasic'.
export const ItineraryBasic = mongoose.model("ItineraryBasic", ItineraryBasicSchema);
