import firebase from "firebase/app";

import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCCK3Gf_2iQwMU3GTVWQKRptDsa4xIPQZ8",
  authDomain: "charity-crm.firebaseapp.com",
  projectId: "charity-crm",
  storageBucket: "charity-crm.appspot.com",
  messagingSenderId: "974936021523",
  appId: "1:974936021523:web:2c6905fc4788d5d5497de6",
  measurementId: "G-JCLFKD9DJ7",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = () => {
  return messaging
    .getToken({
      vapidKey:
        "BIFR3ADLVPiWOp50nyFLwNyqSCiBMtSN6XNBtqSGlJiW0r3Qla3FrxzNZqCWKfVep5FFci1ZXietaHxHcuegHPg",
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one.",
        );
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export const onTokenExprired = () => {
  return messaging.onTokenExprired((token) => {
    console.log(`token expired ${token}`);
  });
};
