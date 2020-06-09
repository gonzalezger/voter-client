/* globals window */
import { auth, authProviders } from "../firebase";

type SocialSignIn = "google" | "facebook";
type SocialSignInProviders =
  | firebase.auth.GoogleAuthProvider
  | firebase.auth.FacebookAuthProvider;
type SocialSignInProvidersMap = {
  [key in SocialSignIn]: SocialSignInProviders;
};

const providers: SocialSignInProvidersMap = {
  google: new authProviders.GoogleAuthProvider(),
  facebook: new authProviders.FacebookAuthProvider(),
};

export async function signInWithEmailAndPasssword(
  email: string,
  password: string
) {
  try {
    return await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    throw err
  }
}

export async function signInSocial(type: SocialSignIn) {
  try {
    const provider = providers[type];

    if (type === 'google') {
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    }

    return await auth.signInWithPopup(provider);
  } catch (err) {
    console.error(err);
    throw err
  }
}
