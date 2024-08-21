import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router

function SignIn() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        setIsSignedIn(true);
        checkIfAdmin(user); // Check if the user is an authorized admin
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
        checkIfAdmin(user); // Check if the user is an authorized admin
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

  const checkIfAdmin = (user: User) => {
    const adminUids = [
      "rwriCJSXkSTjhZUHwRwNOy6LwD43",
      "Bpfhe9nVk1ZOaZATcQbNBFWPmii2",
    ];
    if (adminUids.includes(user.uid)) {
      navigate("/admin/dashboard"); // Redirect to admin dashboard after login
    } else {
      alert("You are not authorized to access the admin panel.");
      SIGN_OUT(); // Sign out if not authorized
    }
  };

  return (
    <section className="mainContent">
      <div className="flex justify-center">
        {isSignedIn ? (
          <>
            <p>Welcome, {user?.displayName}</p>
            <button className="btn1" onClick={SIGN_OUT}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="btn1" onClick={SIGN_IN_WITH_GOOGLE}>
            Logg inn med Google
          </button>
        )}
      </div>
    </section>
  );
}

export default SignIn;
