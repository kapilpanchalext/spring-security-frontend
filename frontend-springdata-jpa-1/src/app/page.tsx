"use client"
import { useState } from "react";
import { CourseModel, StudentCourseSubjectModel, StudentModel, SubjectModel } from "./model/DataModel";
// import styles from "./page.module.css";

export default function Home() {
  const[studentCourseSubjectModel, setStudentCourseSubjectModel] = useState<StudentCourseSubjectModel[]>([]);
  const[studentData, setStudentData] = useState<StudentModel[]>([]);
  const[courseData, setCourseData] = useState<CourseModel[]>([]);
  const[subjectData, setSubjectData] = useState<SubjectModel[]>([]);
  
  const PROTOCOL = "http://";
  const HOST = "localhost";
  const PORT = "9001";
  const API = "/api/v1/";
  const DOMAIN = PROTOCOL + HOST + ":" + PORT + API;

  const ENDPOINTS = {
    COURSES_SUBJECTS:   DOMAIN  + "getStudentByRollno",
    STUDENTS:           DOMAIN  + "getStudentsList",
    COURSES:            DOMAIN  + "getCourseList",
    SUBJECTS:           DOMAIN  + "getSubjectList"
  };

  async function fetchStudentCourseSubjects() {
    try {
      const response = await fetch(ENDPOINTS.COURSES_SUBJECTS);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setStudentCourseSubjectModel(data);
      return data;
    } catch (error) {
      console.error("Error fetching student course subjects:", error);
    }
  };

  async function fetchStudentList() {
    try {
      const response = await fetch(ENDPOINTS.STUDENTS);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setStudentData(data);
      return data;
    } catch (error) {
      console.error("Error fetching student list:", error);
    }
  };

  async function fetchCourseList() {
    try {
      const response = await fetch(ENDPOINTS.COURSES);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setCourseData(data);
      return data;
    } catch (error) {
      console.error("Error fetching student list:", error);
    }
  };

  async function fetchSubjectList() {
    try {
      const response = await fetch(ENDPOINTS.SUBJECTS);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setSubjectData(data);
      return data;
    } catch (error) {
      console.error("Error fetching student list:", error);
    }
  };

  const getData = () => {
    fetchStudentCourseSubjects();
    fetchStudentList();
    fetchCourseList();
    fetchSubjectList();
  };

  // Track the index of the dragged item
  const [draggedIndex, setDraggedIndex] = useState<number>(0);
  const [dragOverIndex, setDragOverIndex] = useState<number>(0);

  const handleDragStart = (index: number, e: React.DragEvent<HTMLDivElement>): void => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move"; // Indicate move action
    e.dataTransfer.setData("text/plain", index.toString()); // Store index being dragged
  };

  const handleDragOver = (index: number, e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const updatedSubjects = [...subjectData];
    const draggedItem = updatedSubjects.splice(draggedIndex, 1)[0]; // Remove dragged item
    updatedSubjects.splice(index, 0, draggedItem); // Insert at the new position

    setSubjectData(updatedSubjects);
    setDraggedIndex(0);
    setDragOverIndex(0);
  };

  return (
    <>
      <button onClick={() => console.log()}>Fetch Student Course Subjects</button>
      <button onClick={() => console.log()}>Fetch Student List</button>
      <button onClick={() => console.log()}>Fetch Course List</button>
      <button onClick={() => console.log()}>Fetch Subject List</button>
      <button onClick={getData}>Get Data</button>
     
      {studentCourseSubjectModel &&
        [...new Map(studentCourseSubjectModel.map(item => 
          [item.firstname + " " + item.lastname, item]
        )).values()].map((studentCourseSubject, index) => (
          <div key={index}>
            <h1>{studentCourseSubject.firstname + " " + studentCourseSubject.lastname}</h1>
            <h2>- {studentCourseSubject.coursename}</h2>
            <h3>- {studentCourseSubject.subjectname}</h3>
            <h4>({studentCourseSubject.textBook})</h4>
          </div>
      ))};

      {studentData &&
        studentData.map((studentCourseSubject, index) => (
          <div key={index}>
            <h1>{studentCourseSubject.firstname + " " + studentCourseSubject.lastname}</h1>
            <h2>- {studentCourseSubject.dob} - ({studentCourseSubject.age})</h2>
            <h3>- {studentCourseSubject.joiningDate}</h3>
          </div>
      ))};

      {courseData &&
        courseData.map((courseDataModel, index) => (
          <div key={index}>
            <h1>{courseDataModel.courseno} - {courseDataModel.coursename}</h1>
            <h3>- {courseDataModel.courseType}</h3>
          </div>
      ))};

      {subjectData &&
        subjectData.map((subjectModel, index) => (
          <div key={index}>
            <h1>  {subjectModel.subjectno} - {subjectModel.subjectname}</h1>
            <h3>- {subjectModel.textBook}</h3>

          </div>
      ))};

      {subjectData.map((subjectModel, index) => (
        <div
          key={subjectModel.subjectno}
          draggable
          onDragStart={(e) => handleDragStart(index, e)}
          onDragOver={(e) => handleDragOver(index, e)}
          onDrop={() => handleDrop(index)}
          style={{
            padding: "10px",
            marginBottom: "8px",
            backgroundColor: draggedIndex === index ? "#d0d0d0" : "#f0f0f0",
            border: draggedIndex === index ? "2px dashed #888" : "1px solid #ccc",
            borderRadius: "5px",
            cursor: "grab",
            opacity: draggedIndex === index ? 0.5 : 1,
          }}
        >
          <h1>
            {subjectModel.subjectno} - {subjectModel.subjectname}
          </h1>
          <h3>- {subjectModel.textBook}</h3>
        </div>
      ))}
    </>
  );
};