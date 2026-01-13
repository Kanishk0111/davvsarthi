"use client";

import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { Search } from "lucide-react";

/* ================= TYPES ================= */

type CutoffRecord = {
  id: number;
  year: string;
  course: string;
  department: string;
  category: string;
  closingRank: string;
};

/* ================= DATA ================= */

const cutoffData: CutoffRecord[] = [
  { id: 1, year: "2023", course: "M.Tech IT", department: "IT", category: "UR-O", closingRank: "74" },
  { id: 2, year: "2023", course: "M.Tech IT", department: "IT", category: "UR-F", closingRank: "146" },
  { id: 3, year: "2023", course: "M.Tech AI & DS", department: "CS", category: "UR-O", closingRank: "93" },
  { id: 4, year: "2023", course: "M.Tech AI & DS", department: "CS", category: "UR-F", closingRank: "197" },
  { id: 5, year: "2023", course: "MCA", department: "Computer Applications", category: "UR-O", closingRank: "346" },
  { id: 6, year: "2023", course: "MCA", department: "Computer Applications", category: "UR-F", closingRank: "538" },

  { id: 7, year: "2025", course: "MBA (Management Science)", department: "Management", category: "UR-O", closingRank: "250" },
  { id: 8, year: "2025", course: "MBA (Finance)", department: "Management", category: "UR-O", closingRank: "200" },
  { id: 9, year: "2025", course: "MBA (E-Commerce)", department: "Management", category: "UR-O", closingRank: "220" },
  { id: 10, year: "2025", course: "MBA (Tourism)", department: "Tourism", category: "UR-O", closingRank: "180" },

  { id: 11, year: "2025", course: "MBA (Management Science)", department: "Management", category: "OBC", closingRank: "350" },
  { id: 12, year: "2025", course: "MBA (Finance)", department: "Management", category: "OBC", closingRank: "370" },
  { id: 13, year: "2025", course: "BBA (Business Decision)", department: "Management", category: "OBC", closingRank: "470" },
  { id: 14, year: "2025", course: "BBA (Aviation)", department: "Aviation Studies", category: "OBC", closingRank: "800" },
  { id: 15, year: "2025", course: "MCA", department: "Computer Applications", category: "OBC", closingRank: "300" },
];

/* ================= PAGE ================= */

const Cutoffs = () => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return cutoffData.filter((row) =>
      `${row.year} ${row.course} ${row.department} ${row.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            Previous Year Admission Cut-offs
          </h1>
          <p className="text-muted-foreground">
            Historical closing ranks (for reference only)
          </p>
        </div>

        {/* DISCLAIMER */}
        <div className="flex items-start gap-3 border border-yellow-400/40 bg-yellow-50 rounded-xl p-4 text-sm">
          <span className="font-bold text-yellow-600">⚠</span>
          <p className="text-yellow-800">
            <strong>Disclaimer:</strong> Closing ranks shown are indicative based
            on previous admission cycles. Actual cut-offs may vary depending on
            merit, category, and seat availability.
          </p>
        </div>

        {/* SEARCH */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by year, course, department, category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* TABLE */}
        <div className="bg-card border rounded-2xl p-4 overflow-x-auto shadow-sm">
          {filteredData.length > 0 ? (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted text-muted-foreground">
                  <th className="p-3 text-left">Year</th>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-center">Category</th>
                  <th className="p-3 text-center">Closing Rank</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                  >
                    <td className="p-3">{row.year}</td>
                    <td className="p-3 font-medium">{row.course}</td>
                    <td className="p-3">{row.department}</td>

                    <td className="p-3 text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        {row.category}
                      </span>
                    </td>

                    <td className="p-3 text-center font-semibold">
                      {row.closingRank}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-muted-foreground py-10">
              No cutoff records found
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cutoffs;
