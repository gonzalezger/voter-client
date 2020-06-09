/* globals window */
import { auth } from "../firebase";

export default async function logout() {
  try {
    await auth
      .signOut();
    // Sign-out successful.
    console.log('signed out');
    return true;
  }
  catch (e) {
    console.error(e);
    return false;
  }
}