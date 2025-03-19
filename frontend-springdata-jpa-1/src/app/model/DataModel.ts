export interface StudentCourseSubjectModel {
  rollno: string,
  firstname: string,
  lastname: string,  
  courseno: string,
  coursename: string,
  subject: string,
  courseType: string,  
  subjectno: string,
  subjectname: string,
  textBook: string,
};

export interface StudentModel {
  rollno: string,
	firstname: string,
	lastname: string,
	dob: string,
	gender: string,
	address: string,
	mobileNumber: number,
	age: number,
	joiningDate: string,
	isStudent:boolean,
};

export interface CourseModel {
  courseno: string,
	coursename: string,
	subject: string,
	courseType: string,
	location: boolean,
};

export interface SubjectModel {
  subjectno: string,
	subjectname: string,
	textBook: string,
};