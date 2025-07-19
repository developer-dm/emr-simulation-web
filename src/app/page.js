"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { analytics } from "../../firebaseConfig";
import { logEvent } from 'firebase/analytics';
import { useEffect } from "react";

export default function Landing() {
  // Log page view event
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view", {
        page_title: "Landing",
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
      console.log("Logged landing page");
    }
  }, [analytics]);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <h1 className={styles.title}>EHR Research Project</h1>
        <h2 className={styles.subtitle}>
          How can existing Electronic Health Record Design be simplified to reduce cognitive overload?
        </h2>
        <hr className={styles.divider} />
        <div className={styles.buttonList}>
          <Link href="/paper">
            <button type="button" className={styles.buttonSide}>Research Paper</button>
          </Link>
          <Link href="/login">
            <button type="button" className={styles.buttonMain}>Go to Demo Login</button>
          </Link>
          <Link href="/docu">
            <button type="button" className={styles.buttonSide}>Documentation</button>
          </Link>
        </div>
        <div className={styles.footer}>
          <p className={styles.footerDisclaimer}>EHR Research Project | By: Dakota M. | For demonstration purposes only</p>
        </div>
      </div>
    </div>
  );
}
