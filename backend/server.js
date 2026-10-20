require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const medicineRoutes = require("./routes/medicines");
const medicalRecordRoutes = require("./routes/medicalRecords");
const caregiverRoutes = require("./routes/caregivers");
const sosRoutes = require("./routes/sos");
const symptomRoutes = require("./routes/symptoms");
const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/nalamai")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("Connection Error:", err);
});
app.use("/api/users", userRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/caregivers", caregiverRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/symptoms", symptomRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("NalamAI Backend Working");
});

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});
