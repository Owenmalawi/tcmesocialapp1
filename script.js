// Import Firebase libraries (use CDN or install via npm for advanced setup)
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Register User
async function registerUser(name, phone, username, password) {
  try {
    await addDoc(collection(db, "users"), {
      name,
      phone,
      username,
      password,
    });
    alert("User registered successfully!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Login User
async function loginUser(username, password) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username), where("password", "==", password));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    alert("Invalid credentials!");
  } else {
    alert("Login successful!");
  }
}

// Example usage
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value;
  const phone = document.getElementById("registerPhone").value;
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  registerUser(name, phone, username, password);
});
    
