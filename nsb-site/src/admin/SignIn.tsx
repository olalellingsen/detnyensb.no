import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import AdminDashboard from "./AdminDashboard";

function SignIn() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        setIsSignedIn(true);
      } else {
        // User is signed out
        setUser(null);
        setIsSignedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const SIGN_IN_WITH_GOOGLE = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User >>>", user);
        setUser(user);
        setIsSignedIn(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const SIGN_OUT = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setIsSignedIn(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <section className="mainContent">
      <>
        {isSignedIn ? (
          <section>
            <div className="flex flex-wrap justify-center sm:justify-between gap-2">
              <p className="py-2 px-4 bg-gray-300 rounded-full w-max">
                {user?.displayName}
              </p>
              <button className="btn1" onClick={SIGN_OUT}>
                Logg ut
              </button>
            </div>
            <br />
            <AdminDashboard />
          </section>
        ) : (
          <div className="flex justify-center">
            <button className="btn1" onClick={SIGN_IN_WITH_GOOGLE}>
              Logg inn med Google
            </button>
          </div>
        )}
      </>
    </section>
  );
}

export default SignIn;
