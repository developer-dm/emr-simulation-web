"use client";

import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { React, useState, useEffect } from 'react';
import "./styles.css";

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
    <div className="container">
      <div className={width > 1050 ? "largeBackground" : "smallBackground"}>
        <div className="loginSection">
          <h1 className="title">EMR Simulation</h1>
          <hr className="divider" />
          <form className="form" onSubmit={handleLogin}>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="button">Log In</button>
          </form>
          {error ? <p className="error">{error}</p> : null}
        </div>
        {width > 1050 && (
          <div className="infoSection">

          </div>
        )}
      </div>
    </div>
  );
}
