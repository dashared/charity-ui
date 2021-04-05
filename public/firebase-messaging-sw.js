/* eslint-disable */
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCCK3Gf_2iQwMU3GTVWQKRptDsa4xIPQZ8",
  authDomain: "charity-crm.firebaseapp.com",
  projectId: "charity-crm",
  storageBucket: "charity-crm.appspot.com",
  messagingSenderId: "974936021523",
  appId: "1:974936021523:web:2c6905fc4788d5d5497de6", //dt5kiODWQLNRKzXsRYdffE:APA91bEqQZRMk7wN7XSYfbYvOOlWAIl00-_qn4zytJnQv4CQn7GycWBw2ZpC873a1pny13GhWqGg40j9141QGITyIaxrh8YRCy5x9Bh27wZJkNzNqXUhg4xXUqB2BH2674E9hriUsNA3
  measurementId: "G-JCLFKD9DJ7",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  // ...
});
