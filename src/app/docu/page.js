"use client";

import { analytics } from "../../../firebaseConfig";
import { logEvent } from "firebase/analytics";
import { useEffect } from "react";

export default function Docu() {
    // Log page view event
      useEffect(() => {
        if (analytics) {
          logEvent(analytics, "page_view", {
            page_title: "Documentation",
            page_location: window.location.href,
            page_path: window.location.pathname,
          });
          console.log("Logged documentation page");
        }
      }, [analytics]);

      return (
        <div>
          <h1>Documentation Page</h1>
          <p>This is the documentation page.</p>
        </div>
      );
}
