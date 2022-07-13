const config = {
  apiKey: "AIzaSyDOifLrBYHONUkSRH0UEiRvJaj4i3f0s7g",
  authDomain: "bingota-18258.firebaseapp.com",
  projectId: "bingota-18258",
  storageBucket: "bingota-18258.appspot.com",
  messagingSenderId: "24254573824",
  appId: "1:24254573824:web:64e24c2dc21692efbed7e5",
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
