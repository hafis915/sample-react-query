import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  REACT_FIREBASE_URL,
  REACT_APP_FIREBASE_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGE_SENDER,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} from "./utils/config";

const firebaseConfig = {
  databaseURL: REACT_FIREBASE_URL,
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGE_SENDER,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default database;
