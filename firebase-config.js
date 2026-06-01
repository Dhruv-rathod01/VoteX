import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdqFYhS8ecX7KjsM5JXg2rSy1Mya6EamA",
  authDomain: "online-voting-system-13860.firebaseapp.com",
  projectId: "online-voting-system-13860",
  storageBucket: "online-voting-system-13860.firebasestorage.app",
  messagingSenderId: "721208760734",
  appId: "1:721208760734:web:b9e4aa1a3a98d29176de8f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };