/**
 * ./src/components/page/Login/AuthProvider.js
 * 소셜 로그인 Provider
 */

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../../../firebase";

export const GoogleLogin = () => {
  const googleProvider = new GoogleAuthProvider();

  return signInWithPopup(auth, googleProvider);
};