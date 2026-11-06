import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtGP1-mYLRNyoaNNxCkF8BGn3Vm83ScUo",
  authDomain: "flutter-96c20.firebaseapp.com",
  projectId: "flutter-96c20",
  storageBucket: "flutter-96c20.firebasestorage.app",
  messagingSenderId: "53415056075",
  appId: "1:53415056075:web:d6ec7336954726f48ec14e",
  measurementId: "G-3P2NPFFRM1",
};

const app = initializeApp(firebaseConfig);

export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const demoAccounts = {
  tenant: {
    email: "demo.tenant@nestsphere.app",
    password: "Demo123!",
  },
  owner: {
    email: "demo.owner@nestsphere.app",
    password: "Demo123!",
  },
} as const;

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signInWithEmailAndPasswordFirebase(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function createAccountWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInDemoAccount(role: keyof typeof demoAccounts): Promise<UserCredential> {
  const account = demoAccounts[role];

  try {
    return await signInWithEmailAndPasswordFirebase(account.email, account.password);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "auth/user-not-found"
    ) {
      return createAccountWithEmail(account.email, account.password);
    }

    throw error;
  }
}
