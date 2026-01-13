import Layout from "@/components/layout/Layout";

/* ================= TYPES ================= */

type ReservationRule = {
  id: number;
  category: string;
  percentage: number;
  domicile: string;
  applicableFor: string;
  notes: string;
};

/* ================= SAME DATA (READ-ONLY) ================= */

const reservationData: ReservationRule[] = [
  {
    id: 1,
    category: "Scheduled Caste (SC)",
    percentage: 16,
    domicile: "Madhya Pradesh",
    applicableFor: "All Programmes",
    notes: "As per MP Government rules",
  },
  {
    id: 2,
    category: "Scheduled Tribe (ST)",
    percentage: 20,
    domicile: "Madhya Pradesh",
    applicableFor: "All Programmes",
    notes: "Applicable to MP domicile candidates only",
  },
  {
    id: 3,
    category: "Other Backward Class (OBC)",
    percentage: 14,
    domicile: "Madhya Pradesh",
    applicableFor: "All Programmes",
    notes: "Non-creamy layer only",
  },
  {
    id: 4,
    category: "Economically Weaker Section (EWS)",
    percentage: 10,
    domicile: "All India",
    applicableFor: "All Programmes",
    notes: "As per Government of India norms",
  },
  {
    id: 5,
    category: "Persons with Disabilities (PwD)",
    percentage: 5,
    domicile: "All India",
    applicableFor: "All Programmes",
    notes: "Horizontal reservation",
  },
];

/* ================= COMPONENT ================= */

const Reservation = () => {
  return (
    <Layout>
      <div className="space-y-8">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Reservation Policy</h1>
          <p className="text-muted-foreground mt-2">
            Category-wise reservation applicable for admissions
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-card border rounded-xl p-5 overflow-x-auto">
          <table className="w-full text-sm border-collapse border">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2">Category</th>
                <th className="border p-2">Reservation %</th>
                <th className="border p-2">Domicile</th>
                <th className="border p-2">Applicable For</th>
                <th className="border p-2">Description</th>
              </tr>
            </thead>

            <tbody>
              {reservationData.map((rule) => (
                <tr key={rule.id}>
                  <td className="border p-2 font-medium">
                    {rule.category}
                  </td>
                  <td className="border p-2 text-center font-semibold">
                    {rule.percentage}%
                  </td>
                  <td className="border p-2 text-center">
                    {rule.domicile}
                  </td>
                  <td className="border p-2 text-center">
                    {rule.applicableFor}
                  </td>
                  <td className="border p-2">
                    {rule.notes || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NOTE */}
        <p className="text-xs text-muted-foreground text-center">
          Note: Reservation is subject to Government of India, State Government,
          and University regulations applicable at the time of admission.
        </p>
      </div>
    </Layout>
  );
};

export default Reservation;
