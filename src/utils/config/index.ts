const {
   REACT_APP_FIREBASE_URL : REACT_FIREBASE_URL,
   REACT_APP_FIREBASE_KEY,
   REACT_APP_FIREBASE_AUTH_DOMAIN,
   REACT_APP_PROJECT_ID,
   REACT_APP_STORAGE_BUCKET,
   REACT_APP_MESSAGE_SENDER,
   REACT_APP_APP_ID,
   REACT_APP_MEASUREMENT_ID
 } = process.env

console.log(REACT_FIREBASE_URL, "<< ini")

export {
   REACT_FIREBASE_URL,
   REACT_APP_FIREBASE_KEY,
   REACT_APP_FIREBASE_AUTH_DOMAIN,
   REACT_APP_PROJECT_ID,
   REACT_APP_STORAGE_BUCKET,
   REACT_APP_MESSAGE_SENDER,
   REACT_APP_APP_ID,
   REACT_APP_MEASUREMENT_ID
}
