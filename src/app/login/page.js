"use client";

import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { React, useState, useEffect } from 'react';
import styles from "./login.module.css";

const findWindowWidth = () => {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const width = findWindowWidth();

  useEffect(() => {
    const savedError = sessionStorage.getItem("loginError");
    if (savedError) {
      setError(savedError);
      sessionStorage.removeItem("loginError");
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful
        console.log("Logged in:", userCredential.user.email);
      })
      .catch((err) => {
        console.log(err);
        sessionStorage.setItem("loginError", "Invalid email or password.");
        window.location.reload();
      });
  }

  if (width === null) return null;

  return (
    <div className={styles.container}>
      <div className={width > 1050 ? styles.largeBackground : styles.smallBackground}>
        <div className={styles.loginSection}>
          <h1 className={styles.title}>EHR Demo</h1>
          <hr className={styles.divider} />
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.button}>Log In</button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        {width > 1050 && (
          <div className={styles.infoSection}>

          </div>
        )}
      </div>
    </div>
  );
}
