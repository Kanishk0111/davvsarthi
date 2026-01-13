"use client";

import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import {
  GraduationCap,
  Users,
  Clock,
  X,
  Info,
  Search,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/* ================= TYPES ================= */

interface Course {
  id: string;
  code: string;
  name: string;
  group: string;
  duration: string;
  cuetSubjects: string;
  academicYear: string;
  totalSeats: number;
  filledSeats: number;
  remarks?: string;
  color: "primary" | "accent" | "success" | "warning";
}

/* ================= DATA ================= */

const coursesData: Course[] = [
  {
    id: "bca",
    code: "BCA",
    name: "Bachelor of Computer Applications",
    group: "D",
    duration: "3 / 4 Years",
    cuetSubjects: "English, Physics, Mathematics",
    academicYear: "2025-26",
    totalSeats: 120,
    filledSeats: 45,
    remarks: "Multiple exit option available",
    color: "primary",
  },
  {
    id: "mba",
    code: "MBA",
    name: "M.B.A. (Management Science)",
    group: "B",
    duration: "5 Years",
    cuetSubjects: "English, General Aptitude Test",
    academicYear: "2025-26",
    totalSeats: 60,
    filledSeats: 35,
    remarks: "Integrated programme",
    color: "accent",
  },
  {
    id: "bpharm",
    code: "B.Pharm",
    name: "Bachelor of Pharmacy",
    group: "E",
    duration: "4 Years",
    cuetSubjects: "English, Physics, Chemistry, Mathematics / Biology",
    academicYear: "2025-26",
    totalSeats: 100,
    filledSeats: 55,
    color: "warning",
  },
];

/* ================= MODAL ================= */

const CourseModal = ({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) => {
  const filledPercent =
    (course.filledSeats / course.totalSeats) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-card border rounded-2xl p-6 w-[92%] max-w-xl space-y-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X />
        </button>

        <div>
          <h2 className="text-2xl font-bold">{course.code}</h2>
          <p className="text-muted-foreground">{course.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><span className="font-medium">Group:</span> {course.group}</p>
          <p><span className="font-medium">Duration:</span> {course.duration}</p>
          <p><span className="font-medium">Academic Year:</span> {course.academicYear}</p>
          <p><span className="font-medium">Total Seats:</span> {course.totalSeats}</p>
        </div>

        <div>
          <span className="font-medium">CUET Subjects</span>
          <p className="text-sm text-muted-foreground mt-1">
            {course.cuetSubjects}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Seats Filled</span>
            <span className="font-medium">
              {course.filledSeats}/{course.totalSeats}
            </span>
          </div>
          <Progress value={filledPercent} />
        </div>

        {course.remarks && (
          <p className="text-xs italic text-muted-foreground">
            {course.remarks}
          </p>
        )}
      </div>
    </div>
  );
};

/* ================= CARD ================= */

const CourseCard = ({
  course,
  onClick,
}: {
  course: Course;
  onClick: () => void;
}) => {
  const availableSeats =
    course.totalSeats - course.filledSeats;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className={cn(
          "h-1 w-12 rounded-full mb-4",
          course.color === "primary" && "bg-primary",
          course.color === "accent" && "bg-accent",
          course.color === "success" && "bg-success",
          course.color === "warning" && "bg-warning"
        )}
      />

      <div className="space-y-1">
        <h3 className="text-xl font-bold">{course.code}</h3>
        <p className="text-sm text-muted-foreground">
          {course.name}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {course.duration}
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {availableSeats} seats
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
        <Info className="h-3 w-3" />
        View details
      </div>
    </div>
  );
};

/* ================= PAGE ================= */

const Courses = () => {
  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);

  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) =>
      `${course.code} ${course.name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Layout>
      <div className="space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">
            Courses & Programs
          </h1>
          <p className="text-muted-foreground">
            Search and click on a course to view details
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search course (e.g. BCA, MBA, Pharmacy)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* GRID */}
        {filteredCourses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => setSelectedCourse(course)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No courses found
          </p>
        )}

        {/* MODAL */}
        {selectedCourse && (
          <CourseModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Courses;
