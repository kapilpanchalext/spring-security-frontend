"use client"
import { use, useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const[data, setData] = useState([]);
  async function fetchStudentCourseSubjects() {
    try {
      const response = await fetch("http://localhost:9001/api/v1/courses-subjects");
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setData(data);
      // alert(JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching student course subjects:", error);
    }
  }

  // Call the function
  useEffect(() => {
    fetchStudentCourseSubjects();
  }, []);

  return (
    <>
      <h1>{JSON.stringify(data)}</h1>
    </>
  );
};