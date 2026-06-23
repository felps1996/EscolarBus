import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  initializeAuth, 
  getReactNativePersistence,
  getAuth
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Credenciais oficiais do projeto EscolarBus
const firebaseConfig = {
  apiKey: "AIzaSyAUnjUSfYQpPiVz9rH852EWrD43AsHSKDI",
  authDomain: "escolarbus-database.firebaseapp.com",
  databaseURL: "https://escolarbus-database-default-rtdb.firebaseio.com",
  projectId: "escolarbus-database",
  storageBucket: "escolarbus-database.firebasestorage.app",
  messagingSenderId: "1009947958450",
  appId: "1:1009947958450:web:0308bccce453096cfcbdab",
  measurementId: "G-JP94DNHJWQ"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getApps().length === 0 
  ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
  : getAuth(app);

export { auth };