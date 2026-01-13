"use client";

import Layout from "@/components/layout/Layout";

/* ================= TYPES ================= */

type AdmissionStatus = "completed" | "ongoing" | "upcoming";

type AdmissionStep = {
  id: number;
  title: string;
  description: string;
  status: AdmissionStatus;
};


type Instruction = {
  id: number;
  text: string;
};

type MeritRuleGroup = {
  id: number;
  group: string;
  rules: {
    priority: number;
    text: string;
  }[];
};

/* ================= DATA ================= */

const admissionSteps: AdmissionStep[] = [
  {
    id: 1,
    title: "CUET (UG) Result Declaration",
    description:
      "Declaration of CUET (UG) 2025 result by the National Testing Agency (NTA).",
    status: "completed",
  },
  {
    id: 2,
    title: "Registration for Counseling",
    description:
      "Eligible candidates must register online on the University counseling portal.",
    status: "ongoing",
  },
  {
    id: 3,
    title: "Merit List Declaration",
    description:
      "Merit list is prepared based on CUET (UG) score as per group-wise criteria.",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Choice Filling",
    description:
      "Candidates fill and lock their preferred programs within the given timeline.",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Program Allotment",
    description:
      "Programs are allotted based on merit, preferences, and seat availability.",
    status: "upcoming",
  },
  {
    id: 6,
    title: "Document Verification",
    description:
      "Candidates must report for centralized document verification.",
    status: "upcoming",
  },
  {
    id: 7,
    title: "Fee Submission",
    description:
      "Selected candidates submit admission fees within the prescribed schedule.",
    status: "upcoming",
  },
];

const instructions: Instruction[] = [
  { id: 1, text: "Admission is strictly based on CUET (UG) merit." },
  { id: 2, text: "Registration on the University counseling portal is mandatory." },
  { id: 3, text: "All admissions are provisional until document verification." },
  { id: 4, text: "Failure to report within the prescribed time will forfeit admission." },
  { id: 5, text: "Fees once paid are non-refundable under any circumstances." },
];

const meritRules: MeritRuleGroup[] = [
  {
    id: 1,
    group: "Group B",
    rules: [
      { priority: 1, text: "Higher CUET (UG) aggregate score" },
      { priority: 2, text: "Higher score in English" },
      { priority: 3, text: "Older candidate preferred (Date of Birth)" },
    ],
  },
  {
    id: 2,
    group: "Group C",
    rules: [
      { priority: 1, text: "Higher CUET aggregate score in PCM subjects" },
      { priority: 2, text: "Higher score in Mathematics" },
      { priority: 3, text: "Older candidate preferred (Date of Birth)" },
    ],
  },
];

/* ================= PAGE ================= */

const AdmissionsOverview = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-20">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Admissions Overview</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete admission process, important instructions, and
            merit determination rules for CUET (UG) admissions
          </p>
        </div>

        {/* ================= ADMISSION PROCESS ================= */}
        <section className="space-y-8">
  <h2 className="text-2xl font-semibold text-center">
    Admission Process (Current Status)
  </h2>

  <div className="relative border-l-2 border-primary/30 pl-8 space-y-10">
    {admissionSteps.map((step, index) => {
      const isCompleted = step.status === "completed";
      const isOngoing = step.status === "ongoing";

      return (
        <div key={step.id} className="relative">

          {/* STATUS DOT */}
          <div
            className={`
              absolute -left-[34px] h-10 w-10 rounded-full
              flex items-center justify-center font-bold text-sm
              ${
                isCompleted
                  ? "bg-success text-white"
                  : isOngoing
                  ? "bg-primary text-primary-foreground animate-pulse"
                  : "bg-muted text-muted-foreground"
              }
            `}
          >
            {index + 1}
          </div>

          {/* CARD */}
          <div
            className={`
              bg-card border rounded-xl p-6
              ${
                isCompleted
                  ? "border-success/40"
                  : isOngoing
                  ? "border-primary/40"
                  : ""
              }
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">
                {step.title}
              </h3>

              {/* STATUS BADGE */}
              <span
                className={`
                  text-xs px-3 py-1 rounded-full font-semibold
                  ${
                    isCompleted
                      ? "bg-success/10 text-success"
                      : isOngoing
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }
                `}
              >
                {isCompleted
                  ? "Phase Completed"
                  : isOngoing
                  ? "Ongoing"
                  : "Upcoming"}
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</section>

        {/* ================= IMPORTANT INSTRUCTIONS ================= */}
       <section className="space-y-8">
  <div className="text-center">
    <h2 className="text-2xl font-bold tracking-tight">
      Important Instructions
    </h2>
    <p className="text-sm text-muted-foreground mt-1">
      Please read carefully before proceeding with admission
    </p>
  </div>

  <div className="grid sm:grid-cols-2 gap-5">
    {instructions.map((inst, index) => (
      <div
        key={inst.id}
        className="
          relative
          bg-background
          border
          rounded-2xl
          p-5
          text-sm
          text-muted-foreground
          shadow-sm
          transition-all
          hover:shadow-md
          hover:-translate-y-0.5
        "
      >
        {/* Accent strip */}
        <span className="absolute left-0 top-4 h-6 w-1 rounded-full bg-primary" />

        {/* Number badge */}
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
            {index + 1}
          </div>

          <p className="leading-relaxed">
            {inst.text}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>


        {/* ================= MERIT RULES ================= */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-center">
            Merit Determination Rules
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {meritRules.map((group) => (
              <div
                key={group.id}
                className="bg-card border rounded-xl p-6 space-y-5"
              >
                <h3 className="text-lg font-semibold text-primary">
                  {group.group}
                </h3>

                <div className="space-y-4">
                  {group.rules.map((rule) => (
                    <div
                      key={rule.priority}
                      className="flex items-start gap-3"
                    >
                      {/* PRIORITY CIRCLE */}
                      <span className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {rule.priority}
                      </span>

                      {/* RULE TEXT */}
                      <p className="text-muted-foreground leading-relaxed">
                        <span className="font-medium">
                          Priority {rule.priority}:
                        </span>{" "}
                        {rule.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOT NOTE */}
        <p className="text-xs text-muted-foreground text-center">
          Note: Admission procedures and merit rules are subject to change
          as per University and Government notifications.
        </p>
      </div>
    </Layout>
  );
};

export default AdmissionsOverview;
