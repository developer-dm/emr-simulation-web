"use client";

import styles from "./dashboard.module.css";
import { analytics } from "../../../firebaseConfig";
import { logEvent } from "firebase/analytics";
import { useEffect } from "react";

export default function Dashboard() {
    // Log page view event
      useEffect(() => {
        if (analytics) {
          logEvent(analytics, "page_view", {
            page_title: "Dashboard",
            page_location: window.location.href,
            page_path: window.location.pathname,
          });
          console.log("Logged dashboard page");
        }
      }, [analytics]);

      return (
        <div>
          <h1>Dashboard</h1>
          <p>This is the dashboard page.</p>
        </div>
      );
}
