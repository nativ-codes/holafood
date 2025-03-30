import {
  GoogleSignin,
  isNoSavedCredentialFoundResponse,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';

export type GoogleAuthResponseType = {
  user: any;
};

export type GoogleAuthErrorType = {
  code: string;
  message: string;
};

export const initializeGoogleSignIn = () => {
  GoogleSignin.configure();
};

export const signInWithGoogle = async (): Promise<GoogleAuthResponseType> => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    console.log("before sign in", response);

    // if (isSuccessResponse(response)) {
      // read user's info
    //   console.log('isSuccessResponse', response);
    if (isNoSavedCredentialFoundResponse(response)) {
      console.log('isNoSavedCredentialFoundResponse', response);
      // Android and Apple only.
      // No saved credential found (user has not signed in yet, or they revoked access)
      // call `createAccount()`
      const googleCredential = auth.GoogleAuthProvider.credential(response.data.idToken);
      console.log('googleCredential', googleCredential);
      return auth().signInWithCredential(googleCredential);
    }

    // await GoogleSignin.hasPlayServices();
    // const { idToken } = await GoogleSignin.signIn();
    // console.log("idToken", idToken);
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // console.log("googleCredential", googleCredential);
    // const userCredential = await auth().signInWithCredential(googleCredential);
    // console.log("userCredential", userCredential);
    // return { user: userCredential.user };
  } catch (error: any) {
    throw {
      code: error.code,
      message: error.message,
    } as GoogleAuthErrorType;
  }
}; 