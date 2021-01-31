const StreamrClient = require("streamr-client");
const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

// ETHEREUM ACCOUNT ADDRESS
var MEMBER_ADDRESS = process.env.MEMBER_ADDRESS;

// ETH CONTRACT ADDRESS
var DATA_UNION = process.env.DATA_UNION;

// SHARED SECRET KEY
var SHARED_SECRET = process.env.SHARED_SECRET;

// STREAMR NETWORK STREAMs IDs
var streamIds = {
  heart: MEMBER_ADDRESS + "/streamr.eth/" + process.env.STREAM_ID_HEART,
  liver: MEMBER_ADDRESS + "/streamr.eth/" + process.env.STREAM_ID_LIVER,
  sugar: MEMBER_ADDRESS + "/streamr.eth/" + process.env.STREAM_ID_SUGAR,
};

// Creating a new Streamr Client
const streamr = new StreamrClient({
  auth: {
    privateKey: process.env.PRIVATE_KEY,
  },
  url: "wss://hack.streamr.network/api/v1/ws",
  restUrl: "https://hack.streamr.network/api/v1"
});

app.get('/', function(_, res) {
  res.send("GET Request at home route successful. Server is working fine");
});

app.post('/heart', function(req, res) {
  streamr.publish(streamIds.heart, {
    age         : req.body["Age"],
    gender      : req.body["Gender"],
    chest_pain  : req.body["Chest Pain"],
    cholestrol  : req.body["Cholesterol"],
    slope       : req.body["Slope"],
    resting_blood_pressure  : req.body["Resting Blood Pressure"],
    fasting_blood_sugar     : req.body["Fasting blood Sugar"],
    max_heart_rate_achieved : req.body["Maximum heart rate achieved"],
    exercise_induced_angina : req.body["Exercise induced Angina"],
    resting_electrocardiographic      : req.body["Resting Electrocardiographic Result"],
    st_depression_induced_by_exercise : req.body["ST depression induced by exercise"],
    no_of_major_blood_vessels         : req.body["Number of major blood vessels"],
  }).then(() => {
    console.log("Heart Streamr Success.");
    res.send("success");
  }).catch((err) => {
    console.log(err);
    res.status(500).send("Failed to publish data");
  });
});

app.post('/liver', function(req, res) {
  streamr.publish(streamIds.liver, {
    age     : req.body["Age"],
    gender  : req.body["Gender"],
    albumin : req.body["Albumin"],
    total_protein : req.body["Total Protein"],
    total_bilirubin     : req.body["Total Bilirubin"],
    direct_bilirubin    : req.body["Direct Bilirubin"],
    alkaline_phosphate  : req.body["Alkaline Phosphate"],
    alamine_aminotransferase    : req.body["Alamine Aminotransferase"],
    aspartate_aminotransferase  : req.body["Aspartate Aminotransferase"],
    albumin_globulin_ratio      : req.body["Albumin : Globulin Ratio"],
  }).then(() => {
    console.log("Liver Streamr Success.");
    res.send("success");
  }).catch((err) => {
    console.log(err);
    res.status(500).send("Failed to publish data");
  });
});

app.post('/sugar', function(req, res) {
  streamr.publish(streamIds.sugar, {
    age     : req.body["Age"],
    gender  : req.body["Gender"],
    insulin : req.body["Insulin"],
    glucose : req.body["Glucose"],
    blood_pressure : req.body["Blood Pressure"],
    pregnancies   : req.body["Pregnacies"],
    height_metre  : req.body["Height"],
    weight_kg     : req.body["Weight"],
    father_had_sugar  : req.body["father"],
    mother_had_sugar  : req.body["mother"],
    paternal_grandfather_sugar  : req.body["gfather"],
    paternal_grandmother_sugar  : req.body["gmother"],
    maternal_grandfather_sugar  : req.body["mgfather"],
    maternal_grandmother_sugar  : req.body["mgmother"],
  }).then(() => {
    console.log("Liver Streamr Success.");
    res.send("success");
  }).catch((err) => {
    console.log(err);
    res.status(500).send("Failed to publish data");
  });
});

app.post('/joinDataUnion', function(_, res) {
  streamr.joinDataUnion(DATA_UNION, SHARED_SECRET).then((ret) => {
    console.log(ret);
    res.send('success');
  }).catch((err) => {
    console.log(err);
    res.send('Oops! Error' + err);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up and running at port " + (process.env.PORT || 3000));
});
