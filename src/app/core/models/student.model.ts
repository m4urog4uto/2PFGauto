import { Course } from "./course.model";

export interface Student {
    id: number;
    name: string;
    surname: string;
    dni: string;
    email: string;
    phone: string;
    courseSelected: string[];
}