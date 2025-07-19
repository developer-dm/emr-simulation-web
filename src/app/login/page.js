"use client";

import { auth, analytics } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { logEvent } from "firebase/analytics";
import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import styles from "./login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [width, setWidth] = useState(null);
  const router = useRouter();

  // Log page view event
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view", {
        page_title: "Login",
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
      console.log("Logged login page");
    }
  }, [analytics]);

  // Handle window resize to adjust width
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check for saved error message in session storage
  useEffect(() => {
    const savedError = sessionStorage.getItem("loginError");
    if (savedError) {
      setError(savedError);
      sessionStorage.removeItem("loginError");
    }
  }, []);

  // Handle login
  const handleLogin = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged in:", userCredential.user.email);
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err.code, err.message);
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
          <h2 className={styles.subtitle}>Log in with your user credentials</h2>
          <hr className={styles.divider} />
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.button}>Log In</button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          <hr className={styles.divider} />
          <Link href="/" className={styles.link}>Create Account</Link>
          <Link href="/" className={styles.link}>Forgot Email or Password</Link>
          <Link href="/" className={styles.link}>Return Home</Link>
          <div className={styles.footer}>
            <p className={styles.footerText}>By: Dakota M. | For demonstration purposes only</p>
          </div>
        </div>
        {width > 1050 && (
          <div className={styles.infoSection}>

          </div>
        )}
      </div>
    </div>
  );
}
