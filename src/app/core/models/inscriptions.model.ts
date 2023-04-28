import { Course } from "./course.model";

export interface Mentor {
    id: number;
    fullName: string;
}

export interface InscriptionsStudents {
    id: number;
    fullName: string;
    dni: string;
}

export interface Inscription {
    id: number;
    commission: number;
    courseSelected: Course;
    mentors: Mentor[];
    students: InscriptionsStudents[];
}