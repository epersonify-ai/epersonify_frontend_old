import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {faker} from "@faker-js/faker";

// Firebase Admin SDK to access Firestore.
admin.initializeApp();
const db = admin.firestore();

async function generateUniqueUsername(): Promise<string> {
  let username = "";  // TypeScript will infer that `username` is a string
  let isUnique = false;

  while (!isUnique) {
    username = faker.internet.userName().toLowerCase();
    const usernameDoc = await db.collection("usernames").doc(username).get();

    if (!usernameDoc.exists) {
      isUnique = true;
      await db.collection("usernames").doc(username).set({uid: "reserved"});
    }
  }

  return username;
}

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    let name = "";
    let photoURL = "";

    // Extract name and imageUrl from providerData if available
    if (user.providerData && user.providerData.length > 0) {
      const provider = user.providerData[0];
      name = provider.displayName || "";
      photoURL = provider.photoURL || "";
    }

    const username = await generateUniqueUsername();

    const newUser = {
      uid: user.uid,
      name: name,
      photoURL: photoURL,
      username: username,
      bio: "",
      email: user.email,
      providerData: user.providerData,
    };

    await db.collection("users").doc(user.uid).set(newUser);
    await db.collection("usernames").doc(username).set({uid: user.uid});
  });

export const deleteUserDocument = functions.auth
  .user()
  .onDelete(async (user) => {
    const userDoc = await db.collection("users").doc(user.uid).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData && userData.username) {
        await db.collection("usernames").doc(userData.username).delete();
      }
    }
    await db.collection("users").doc(user.uid).delete();
  });

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello, World!");
});
