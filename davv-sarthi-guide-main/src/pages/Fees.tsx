"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  IndianRupee,
  Download,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/* ================= DATA ================= */

const feeStructure = [
  {
    course: "B.Tech (All Branches)",
    tuition: 85000,
    development: 15000,
    exam: 5000,
    other: 5000,
    total: 110000,
    type: "UG",
  },
  {
    course: "MBA",
    tuition: 95000,
    development: 15000,
    exam: 5000,
    other: 5000,
    total: 120000,
    type: "PG",
  },
  {
    course: "BCA",
    tuition: 45000,
    development: 10000,
    exam: 4000,
    other: 3000,
    total: 62000,
    type: "UG",
  },
  {
    course: "MCA",
    tuition: 65000,
    development: 12000,
    exam: 4000,
    other: 4000,
    total: 85000,
    type: "PG",
  },
  {
    course: "B.Sc (All Streams)",
    tuition: 25000,
    development: 8000,
    exam: 3000,
    other: 2000,
    total: 38000,
    type: "UG",
  },
  {
    course: "M.Sc (All Streams)",
    tuition: 35000,
    development: 10000,
    exam: 3500,
    other: 2500,
    total: 51000,
    type: "PG",
  },
  {
    course: "B.Com Honours",
    tuition: 30000,
    development: 8000,
    exam: 3000,
    other: 2000,
    total: 43000,
    type: "UG",
  },
];

const scholarships = [
  {
    name: "Merit Scholarship",
    eligibility: "90% and above in qualifying exam",
    benefit: "100% tuition fee waiver",
  },
  {
    name: "SC/ST Scholarship",
    eligibility: "SC/ST category students",
    benefit: "Full fee reimbursement by state",
  },
  {
    name: "EWS Scholarship",
    eligibility: "Family income below ₹3 LPA",
    benefit: "50% tuition fee waiver",
  },
  {
    name: "Sports Quota",
    eligibility: "National / State level players",
    benefit: "Up to 100% fee waiver",
  },
];

const paymentModes = [
  "Online Payment (Net Banking, Credit/Debit Card, UPI)",
  "Demand Draft in favor of 'Registrar, DAVV'",
  "Bank Challan at designated bank branches",
  "Installment facility available for eligible students",
];

const contactInfo = [
  { type: "email", label: "Email", value: "accounts@davv.ac.in" },
  { type: "email", label: "Fee Support", value: "fees.support@davv.ac.in" },
  { type: "phone", label: "Office Phone", value: "+91 731 2527532" },
  { type: "phone", label: "Helpline", value: "+91 731 2467890" },
];

/* ================= PAGE ================= */

const Fees = () => {
  const [showContactDialog, setShowContactDialog] = useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <Layout>
      {/* HERO */}
      <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">
          Fee Structure & Scholarship Details
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Complete breakdown of course fees along with scholarships and flexible
          payment options.
        </p>
      </div>

      {/* FEES TABLE */}
      <section className="py-12 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Course-wise Fee Details
            </h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>

          <div className="rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Tuition</TableHead>
                    <TableHead className="text-right">Development</TableHead>
                    <TableHead className="text-right">Exam</TableHead>
                    <TableHead className="text-right">Other</TableHead>
                    <TableHead className="text-right">Total / Year</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {feeStructure.map((fee, index) => (
                    <TableRow key={index} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <span className="font-medium">
                            {fee.course}
                          </span>
                          <Badge
                            className="text-[10px] px-2 py-0.5"
                            variant={fee.type === "UG" ? "default" : "secondary"}
                          >
                            {fee.type}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(fee.tuition)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(fee.development)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(fee.exam)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(fee.other)}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {formatCurrency(fee.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-6 p-4 flex gap-3 items-start bg-info/10 border border-info/30 rounded-xl">
            <AlertCircle className="w-5 h-5 text-info mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> Fees are subject
              to revision. Hostel & mess charges are additional. One-time
              admission fee of ₹5,000 applicable.
            </p>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIPS */}
      <section className="py-14 bg-muted/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-3">
              <IndianRupee className="w-4 h-4" />
              Financial Aid
            </div>
            <h2 className="text-3xl font-bold">
              Scholarships & Concessions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {scholarships.map((s, i) => (
              <div
                key={i}
                className="bg-card border rounded-xl p-6 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-3">{s.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[90px]">
                      Eligibility:
                    </span>
                    <span>{s.eligibility}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[90px]">
                      Benefit:
                    </span>
                    <span className="font-semibold text-success">
                      {s.benefit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT MODES */}
      <section className="py-14 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Payment Options</h2>
            <p className="text-muted-foreground">
              Multiple convenient ways to pay your fees
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <ul className="space-y-3">
              {paymentModes.map((mode, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <span>{mode}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t">
              <Button
                className="w-full sm:w-auto"
                onClick={() => setShowContactDialog(true)}
              >
                Contact Accounts Office
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT DIALOG */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Accounts Office Contact</DialogTitle>
            <DialogDescription>
              Reach out for fee-related queries
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {contactInfo.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  {c.type === "email" ? (
                    <Mail className="w-4 h-4 text-primary" />
                  ) : (
                    <Phone className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-sm font-medium">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-info/10 rounded-lg text-sm">
            <strong>Office Hours:</strong> Mon–Fri, 10:00 AM – 5:00 PM
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Fees;
