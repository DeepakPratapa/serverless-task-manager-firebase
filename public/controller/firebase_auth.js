import {
    getAuth, signInWithEmailAndPassword, sendEmailVerification,
    onAuthStateChanged, signOut,createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { app } from "./firebase_core.js";
import { DEV } from "../model/constant.js";
import { homePageView } from "../view/home_page.js";
import { signinPageView } from "../view/signin_page.js";
import { routePathenames, routing } from "./route_controller.js";
import { userInfo } from "../view/elements.js";

const auth = getAuth(app);
export let currentUser = null;

export async function sendVerificationEmail(user) {
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent to", user.email);
      alert("Verification email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending verification email", error);
      alert("Error sending verification email: " + error.message);
    }
  }

  export function checkEmailVerification(user) {
    return user.emailVerified;
  }










export async function validatePassword(password) {
    // const minLength = 8;
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumbers = /\d/.test(password);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // if (password.length < minLength) {
    //     return "Password must be at least 8 characters long.";
    // }
    // if (!hasUpperCase) {
    //     return "Password must contain at least one uppercase letter.";
    // }
    // if (!hasLowerCase) {
    //     return "Password must contain at least one lowercase letter.";
    // }
    // if (!hasNumbers) {
    //     return "Password must contain at least one number.";
    // }
    // if (!hasSpecialChar) {
    //     return "Password must contain at least one special character.";
    // }

    return null; // Password is valid
}


// export async function handleSignUp(email, password) {
    
//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
       
//         // Redirect to a waiting verification page
//         // await sendVerificationEmail(user);
//         window.location.href = "/verify";
        
//       } catch (error) {
//         console.error("Error during sign up:", error);
//         alert("Sign up error: " + error.message);
//       }
    
// }1

export async function handleSignUp(email, password) {
  try {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
    const user = userCredential.user;
    await sendVerificationEmail(user);
    await signOut(auth); // Sign out the user immediately after sending verification email
    console.log("User registered. Verification email sent.");
    alert("Registration successful. Please verify your email.");
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration error: " + error.message);
  }
}
export async function signinFirebase(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (checkEmailVerification(user)) {
          console.log("Email verified. Signing in...");
          window.location.href = "/home";
        } else {
          console.log("Email not verified");
          await signOut(auth);
          alert("Please verify your email before signing in.");
          // Optionally, offer to resend verification email
          // await sendVerificationEmail(user);
        }
      } catch (error) {
        console.error("Error during sign in:", error);
        alert("Sign in error: " + error.message);
      }
}

export function attachAuthStateChangeObserver() {
    onAuthStateChanged(auth, authStateChangeListener);
}

// export function setupAuthListener() {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         if (checkEmailVerification(user)) {
//           console.log("User is signed in and email is verified");
//           // Perform actions for verified, signed-in user
//         } else {
//           console.log("User is signed in but email is not verified");
//           // Optionally, prompt user to verify email
//         }
//       } else {
//         console.log("No user is signed in");
//         // Perform actions for signed-out state
//       }
//     });
//   }

  
function authStateChangeListener(user) {

    currentUser = user;
    if (user) {
        userInfo.textContent = user.email;
        const postAuth = document.getElementsByClassName('myclass-postauth');
        for (let i=0; i<postAuth.length; i++) {
            postAuth[i].classList.replace('d-none', 'd-block');
        }
        const preAuth = document.getElementsByClassName('myclass-preauth');
        for (let i=0; i<preAuth.length; i++) {
            preAuth[i].classList('d-block', 'd-none');
        }
        const pathname = window.location.pathname;
        const hash = window.location.hash;
        routing(pathname, hash);
        
    } else {
        userInfo.textContent = 'No User';

        const postAuth = document.getElementsByClassName('myclass-postauth');
        for (let i=0; i<postAuth.length; i++) {
            postAuth[i].classList.replace('d-block', 'd-none');
        }
        const preAuth = document.getElementsByClassName('myclass-preauth');
        for (let i=0; i<preAuth.length; i++) {
            preAuth[i].classList('d-none', 'd-block');
        }
        history.pushState(null, null, routePathenames.HOME);
       signinPageView();
    }
}
export async function signOutFirebase() {
    await signOut(auth);

}


