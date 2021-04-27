// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
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

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
