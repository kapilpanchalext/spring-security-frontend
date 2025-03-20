"use client"
import { StudentCourseSubjectModel, ENDPOINTS } from "@/model/DataModel";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const[studentCourseSubjectModel, setStudentCourseSubjectModel] = useState<StudentCourseSubjectModel[]>([]);
  const router = useRouter();

  const studentCourseListHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const url = `${ENDPOINTS.COURSES_SUBJECTS}?rollNo=1`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.dir(data);
      setStudentCourseSubjectModel(data);
      return data;
    } catch (error) {
      console.error("Error fetching student course subjects:", error);
    }
  };

  const studentListHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push('/studentCourseSelector')
  };

  const courseListHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push('/courseSubjectSelector')
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Spring Data JPA</h1>
      <button onClick={studentCourseListHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Student Course List</button>
      <button onClick={studentListHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Student List</button>
      <button onClick={courseListHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Course List</button>

      <div>
        {studentCourseSubjectModel.map((item, index) => (
          <div key={index}>
            <p>{JSON.stringify(item)}</p>
          </div>
        ))}
      </div>
    </>
  );
}