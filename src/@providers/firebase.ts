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
const vapidKey =
  "BIFR3ADLVPiWOp50nyFLwNyqSCiBMtSN6XNBtqSGlJiW0r3Qla3FrxzNZqCWKfVep5FFci1ZXietaHxHcuegHPg";
const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  console.log(payload);
});

messaging.getToken({ vapidKey });

export const requestFirebaseNotificationPermission = (): Promise<string> =>
  new Promise((resolve, reject) => {
    Notification.requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        console.log(firebaseToken);
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = (): Promise<void> =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
