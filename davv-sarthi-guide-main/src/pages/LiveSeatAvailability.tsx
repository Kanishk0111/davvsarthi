"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

/* ================= TYPES ================= */

type Category = {
  total: { male: number; female: number };
  filled: { male: number; female: number };
};

type Course = {
  id: string;
  code: string;
  name: string;
  categories: {
    st: Category;
    sc: Category;
    obc: Category;
    gen: Category;
  };
  totalSeats: number;
  totalFilled: number;
};

/* ================= DATA ================= */

const courses: Course[] = [
  {
    id: "bca",
    code: "BCA",
    name: "Bachelor of Computer Applications",
    categories: {
      st: {
        total: { male: 10, female: 10 },
        filled: { male: 6, female: 5 },
      },
      sc: {
        total: { male: 12, female: 8 },
        filled: { male: 9, female: 6 },
      },
      obc: {
        total: { male: 20, female: 15 },
        filled: { male: 14, female: 10 },
      },
      gen: {
        total: { male: 18, female: 17 },
        filled: { male: 11, female: 9 },
      },
    },
    totalSeats: 60,
    totalFilled: 40,
  },

  {
    id: "bsc_cs",
    code: "BSc-CS",
    name: "Bachelor of Science (Computer Science)",
    categories: {
      st: {
        total: { male: 8, female: 7 },
        filled: { male: 5, female: 4 },
      },
      sc: {
        total: { male: 10, female: 6 },
        filled: { male: 7, female: 5 },
      },
      obc: {
        total: { male: 16, female: 14 },
        filled: { male: 12, female: 9 },
      },
      gen: {
        total: { male: 14, female: 15 },
        filled: { male: 10, female: 11 },
      },
    },
    totalSeats: 45,
    totalFilled: 33,
  },

  {
    id: "bcom",
    code: "BCom",
    name: "Bachelor of Commerce",
    categories: {
      st: {
        total: { male: 6, female: 6 },
        filled: { male: 4, female: 3 },
      },
      sc: {
        total: { male: 8, female: 7 },
        filled: { male: 6, female: 5 },
      },
      obc: {
        total: { male: 14, female: 16 },
        filled: { male: 11, female: 13 },
      },
      gen: {
        total: { male: 18, female: 15 },
        filled: { male: 14, female: 11 },
      },
    },
    totalSeats: 50,
    totalFilled: 37,
  },

  {
    id: "ba",
    code: "BA",
    name: "Bachelor of Arts",
    categories: {
      st: {
        total: { male: 5, female: 7 },
        filled: { male: 3, female: 5 },
      },
      sc: {
        total: { male: 7, female: 8 },
        filled: { male: 5, female: 6 },
      },
      obc: {
        total: { male: 12, female: 18 },
        filled: { male: 9, female: 14 },
      },
      gen: {
        total: { male: 13, female: 17 },
        filled: { male: 10, female: 13 },
      },
    },
    totalSeats: 45,
    totalFilled: 35,
  },

  {
    id: "bsc_math",
    code: "BSc-Math",
    name: "Bachelor of Science (Mathematics)",
    categories: {
      st: {
        total: { male: 6, female: 4 },
        filled: { male: 4, female: 3 },
      },
      sc: {
        total: { male: 7, female: 5 },
        filled: { male: 5, female: 4 },
      },
      obc: {
        total: { male: 14, female: 10 },
        filled: { male: 11, female: 7 },
      },
      gen: {
        total: { male: 12, female: 12 },
        filled: { male: 9, female: 8 },
      },
    },
    totalSeats: 35,
    totalFilled: 26,
  },
];

/* ================= PAGE ================= */

const LiveSeatAvailability = () => {
  const [search, setSearch] = useState("");

  const filtered = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">Counselling Updates</h1>
          <p className="text-sm text-muted-foreground">
            Category & gender-wise seat status (after first counseling round)
          </p>
        </div>

        {/* ================= NOTICE STRIP ================= */}
        <div className="relative overflow-hidden border-y bg-primary/5">
          <div className="flex whitespace-nowrap animate-seat-marquee">
            <span className="px-6 py-2 text-xs font-medium text-primary">
               Seat availability shown below is based on
              <span className="font-semibold">
                {" "}First Round of Counseling (2025)
              </span>.
              Data may change in subsequent rounds.
            </span>

            {/* duplicate for smooth loop */}
            <span className="px-6 py-2 text-xs font-medium text-primary">
               Seat availability shown below is based on
              <span className="font-semibold">
                {" "}First Round of Counseling (2025)
              </span>.
              Data may change in subsequent rounds.
            </span>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search course (e.g. BCA)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>

        {/* COURSES */}
{/* COURSES */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
  {filtered.map((course) => (
    <div
      key={course.id}
      className="relative border rounded-lg p-4 bg-background shadow-sm hover:shadow-md transition"
    >
      {/* BLUE ACCENT BAR */}
      <div className="absolute top-0 left-0 h-1 w-full bg-blue-500 rounded-t-lg" />

      {/* COURSE TITLE */}
      <h3 className="text-sm font-bold text-foreground leading-tight mb-2">
        {course.name}
        <span className="block text-[11px] text-muted-foreground font-medium">
          {course.code}
        </span>
      </h3>

      {/* HEADER */}
      <div className="grid grid-cols-3 text-[10px] text-muted-foreground border-b pb-1">
        <span>Cat</span>
        <span className="text-center">Seats (M/F)</span>
        <span className="text-center">Filled (M/F)</span>
      </div>

      {/* CATEGORY ROWS */}
      <div className="text-[11px]">
        {[
          { label: "ST", data: course.categories.st },
          { label: "SC", data: course.categories.sc },
          { label: "OBC", data: course.categories.obc },
          { label: "GEN", data: course.categories.gen },
        ].map(({ label, data }) => (
          <div
            key={label}
            className="grid grid-cols-3 items-center px-1 py-[2px]"
          >
            <span className="font-medium">{label}</span>

            <span className="text-center text-muted-foreground">
              {data.total.male}/{data.total.female}
            </span>

            <span className="text-center text-blue-600 font-semibold">
              {data.filled.male}/{data.filled.female}
            </span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between mt-2 text-[10px]">
        <span className="bg-muted px-2 py-1 rounded">
          Total: {course.totalSeats}
        </span>
        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">
          Filled: {course.totalFilled}
        </span>
      </div>
    </div>
  ))}
</div>


          

        <p className="text-xs text-muted-foreground text-center">
          Note: Seat data is indicative and subject to change during counseling.
        </p>
      </div>
    </Layout>
  );
};

export default LiveSeatAvailability;
