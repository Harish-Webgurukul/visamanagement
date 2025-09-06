const mongoose = require("mongoose");
const dotenv = require("dotenv");
const crypto = require("crypto");
dotenv.config();

// Load models
const Permission = require("./models/Permission");
const Role = require("./models/Role");
const User = require("./models/User");
const Country = require("./models/Country");
const VisaPurpose = require("./models/VisaPurpose");
const VisaOption = require("./models/VisaOption");
const Document = require("./models/Document");
const Enquiry = require("./models/Enquiry");
const FollowUp = require("./models/FollowUp");
const CustomerDoc = require("./models/CustomerDoc");
const ShareLink = require("./models/ShareLink");
const Notification = require("./models/Notification");
const AuditLog = require("./models/AuditLog");

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  try {
    console.log("Clearing existing data...");
    await Permission.deleteMany();
    await Role.deleteMany();
    await User.deleteMany();
    await Country.deleteMany();
    await VisaPurpose.deleteMany();
    await VisaOption.deleteMany();
    await Document.deleteMany();
    await Enquiry.deleteMany();
    await FollowUp.deleteMany();
    await CustomerDoc.deleteMany();
    await ShareLink.deleteMany();
    await Notification.deleteMany();
    await AuditLog.deleteMany();

    console.log("Seeding dummy data...");

    // ✅ Permissions (added key field)
    const permissions = await Permission.insertMany([
      { name: "Manage Users", key: "manage_users", description: "Create, edit, delete users" },
      { name: "Manage Visas", key: "manage_visas", description: "Manage visa documents and options" },
      { name: "Manage Enquiries", key: "manage_enquiries", description: "Handle enquiries and follow-ups" },
      { name: "View Reports", key: "view_reports", description: "View system reports and analytics" },
    ]);

    // ✅ Roles
    const roles = await Role.insertMany([
      { name: "Admin", permissions: permissions.map((p) => p._id) },
      {
        name: "Manager",
        permissions: [permissions[1]._id, permissions[2]._id, permissions[3]._id],
      },
      {
        name: "Staff",
        permissions: [permissions[2]._id, permissions[3]._id],
      },
    ]);

    // ✅ Users
    const users = await User.insertMany([
      {
        name: "System Admin",
        email: "admin@visaapp.com",
        password: "Admin@123",
        role: roles[0]._id,
      },
      {
        name: "John Manager",
        email: "manager@visaapp.com",
        password: "Manager@123",
        role: roles[1]._id,
      },
      {
        name: "Sarah Staff",
        email: "staff@visaapp.com",
        password: "Staff@123",
        role: roles[2]._id,
      },
    ]);

    // ✅ Countries
    const countries = await Country.insertMany([
      { name: "United States", code: "US" },
      { name: "United Kingdom", code: "UK" },
      { name: "India", code: "IN" },
    ]);

    // Visa Purposes
const purposes = await VisaPurpose.insertMany([
  { name: "Tourism",   key: "tourism",   description: "Travel for leisure and tourism" },
  { name: "Business",  key: "business",  description: "Travel for business purposes" },
  { name: "Education", key: "education", description: "Travel for educational purposes" }
]);


    // ✅ Visa Options
    // Insert VisaOptions and store the result
const visaOptions = await VisaOption.insertMany([
  {
    country: countries[0]._id,
    purpose: purposes[0]._id,
    title: "Tourist Visa - 6 Months",
    details: "Standard tourist visa valid for 6 months",
    fees: {
      adultPrice: 120,
      childPrice: 60,
      serviceFee: 15,
      additionalCharges: [{ label: "Urgent Processing", price: 50 }],
    },
  },
  {
    country: countries[1]._id,
    purpose: purposes[1]._id,
    title: "Business Visa - 1 Year",
    details: "Visa for business travel, valid for 1 year",
    fees: {
      adultPrice: 200,
      serviceFee: 25,
      additionalCharges: [{ label: "VIP Service", price: 75 }],
    },
  },
]);


   // ✅ Documents
await Document.insertMany([
  {
    country: countries[0]._id,
    purpose: purposes[0]._id,
    name: "United States - Tourism Documents",
    requiredDocuments: [
      "Valid Passport",
      "Visa Application Form",
      "Recent Passport Photo",
      "Travel Insurance"
    ],
    tags: ["visa", "tourism", "documents"], // ✅ Array of strings
    notes: "All documents must be in English or translated."
  }
]);


    // ✅ Enquiries
const enquiries = await Enquiry.insertMany([
  {
    customerName: "Michael Scott",
    email: "michael@example.com",
    mobile: "1234567890",
    country: countries[0]._id,
    purpose: purposes[0]._id,
    status: "new",
    notes: "Need details for US tourist visa.",
  },
]);



    // ✅ FollowUps
  await FollowUp.insertMany([
  {
    enquiry: enquiries[0]._id,
     type: "call", 
    followUpDate: new Date(),
    notes: "Called customer and sent visa details via email.",
  },
]);

    // ✅ Customer Uploaded Docs
    await CustomerDoc.insertMany([
      {
        customer: users[2]._id,
        country: countries[0]._id,
        purpose: purposes[0]._id,
        documents: [
          { name: "Passport Scan", url: "uploads/passport.jpg" },
          { name: "Photo", url: "uploads/photo.jpg" },
        ],
      },
    ]);

    // ✅ Share Links
    await ShareLink.insertMany([
  {
    visaOption: visaOptions[0]._id, // ✅ required
    token: crypto.randomBytes(16).toString("hex"), // ✅ required unique token
    createdBy: users[0]._id,
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 7)),
    isOneTime: false,
  },
]);

    // ✅ Notifications
    await Notification.insertMany([
  {
    toUser: users[1]._id,            // Correct field
    type: "inapp",                    // One of the required enum values
    title: "New Enquiry Assigned",
    body: "You have been assigned a new enquiry for US tourist visa.",
    status: "queued"                  // optional, default is 'queued'
  },
]);


    // ✅ Audit Logs
    await AuditLog.insertMany([
      {
        action: "CREATE_USER",
        performedBy: users[0]._id,
        details: "Created new manager account.",
      },
    ]);

    console.log("🎉 Dummy data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
