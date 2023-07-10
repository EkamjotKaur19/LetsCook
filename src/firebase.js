import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
    apiKey: "AIzaSyC0KjoI0OId-YeOf8owFE_Ps7AQuDBVY4g",
    authDomain: "let-s-cook-3b3dd.firebaseapp.com",
    projectId: "let-s-cook-3b3dd",
    storageBucket: "let-s-cook-3b3dd.appspot.com",
    messagingSenderId: "914425601855",
    appId: "1:914425601855:web:deb4659be9fc1405c47d8a",
    measurementId: "G-1JW92532N7"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        wishlist: []
      });
    }
    toast.success('User Logged In', {
      position: toast.POSITION.TOP_RIGHT
  });
  } catch (err) {
    console.error(err);
    toast.error(err.message, {
      position: toast.POSITION.TOP_RIGHT
  });
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success('User Logged In', {
      position: toast.POSITION.TOP_RIGHT
  });
  } catch (err) {
    toast.error('Unregistered User or invalid Credentials', {
      position: toast.POSITION.TOP_RIGHT
  });
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      wishlist:[]
    });
    toast.success('User Registered Successfully', {
      position: toast.POSITION.TOP_RIGHT
  });
  } catch (err) {
    toast.error(err.message, {
      position: toast.POSITION.TOP_RIGHT
  });
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    toast.error(err.message, {
      position: toast.POSITION.TOP_RIGHT
  });
  }
};
const logout = () => {
  signOut(auth);
  toast.success('User Logged Out', {
    position: toast.POSITION.TOP_RIGHT
});
};
export {
  auth,
  db,
  getFirestore,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  sendPasswordResetEmail,
  logout,
  googleProvider
};