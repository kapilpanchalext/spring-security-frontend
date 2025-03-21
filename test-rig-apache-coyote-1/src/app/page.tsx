"use client"

import { useState } from "react";
import styles from "./page.module.scss";

export default function Home() {

  const [responseData, setResponseData] = useState("");

  // Button click handler
  const handleClick = async () => {

    // window.location.href = "http://localhost:8084/api/v1/helloworld";

    try {
      const response = await fetch("http://localhost:8084/api/v1/helloworld", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin@email.com:1234")
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      setResponseData(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setResponseData("Failed to fetch data from the server.");
    }
  };

  return (
    <>
      <button onClick={handleClick} className={styles.button}>
        Fetch Data
      </button>
    </>
  );
}
