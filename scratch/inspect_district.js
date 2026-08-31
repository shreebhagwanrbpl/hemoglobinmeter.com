const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDGIJXX3MR1CxmIJbJHyVzbfRa0M0Sw6FQ",
  authDomain: "rajbiosis-central.firebaseapp.com",
  projectId: "rajbiosis-central",
  storageBucket: "rajbiosis-central.firebasestorage.app",
  messagingSenderId: "190335913620",
  appId: "1:190335913620:web:99a14edcbb528f06c1ee81"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const districtName = "jaipur";
  console.log(`Fetching district ${districtName} data...`);
  const snap = await getDoc(
    doc(db, "websites", "hemoglobinmetercom", "districts", districtName)
  );

  if (snap.exists()) {
    console.log("Data found:", JSON.stringify(snap.data(), null, 2));
  } else {
    console.log("District not found.");
  }
  process.exit(0);
}

run().catch(console.error);
