
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxrxnAIHqtbvLRdTdhSy3qRWbEWBnM5BA",
  authDomain: "hrms-191d4.firebaseapp.com",
  projectId: "hrms-191d4",
  storageBucket: "hrms-191d4.appspot.com",
  messagingSenderId: "661699255308",
  appId: "1:661699255308:web:4a7e1b3d43852e406be229",
  measurementId: "G-7L87BPLP93"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
// adding the department 
async function addDepartment(name, id) {
  try {
    const docRef = await addDoc(collection(db, "departments"), {
      name: name,
      id: id
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Example usage
addDepartment("Human Resources", "hr01");
