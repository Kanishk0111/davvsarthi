import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { HelpCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import ChatbotUI from "@/components/chatbot/ChatbotUI";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ================= FAQ DATA ================= */

const faqCategories = [
  {
    category: "Admission Process",
    questions: [
      {
        q: "When does the admission process start?",
        a: "The admission process typically starts in June. Online registration opens in early June and closes by the end of the month.",
      },
      {
        q: "Is there an entrance exam for admission?",
        a: "Yes. Admissions are primarily based on CUET (UG/PG) scores as per university norms.",
      },
      {
        q: "Can I apply for multiple courses?",
        a: "Yes, you can select multiple course preferences during counseling.",
      },
      {
        q: "How does counseling work?",
        a: "Counseling is conducted online in multiple rounds based on merit and seat availability.",
      },
    ],
  },
  {
    category: "Eligibility",
    questions: [
      {
        q: "What is the eligibility for UG programs?",
        a: "Eligibility varies by course. Most UG programs require 10+2 qualification with relevant subjects.",
      },
      {
        q: "Is there age limit for admission?",
        a: "Generally, there is no upper age limit unless specified by the program.",
      },
    ],
  },
  {
    category: "Fees & Payments",
    questions: [
      {
        q: "How can I pay admission fees?",
        a: "Fees are paid online through the university counseling portal after seat allotment.",
      },
      {
        q: "Are scholarships available?",
        a: "Yes, scholarships are available for SC/ST/OBC/EWS and meritorious students as per government norms.",
      },
    ],
  },
  {
    category: "Documents",
    questions: [
      {
        q: "What documents are required?",
        a: "10th & 12th marksheets, domicile certificate, category certificate (if applicable), Aadhaar card, and photographs.",
      },
      {
        q: "Are original documents mandatory?",
        a: "Yes, original documents are required during verification.",
      },
    ],
  },
];

/* ================= COMPONENT ================= */

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur border text-white text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              Need Help?
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/85">
              Find quick answers or chat with our admission counselor for
              personalized guidance.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

            {/* ===== FAQ LIST ===== */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Link to="/eligibility">
                  <Button>Check Eligibility</Button>
                </Link>
              </div>

              <div className="space-y-6">
                {filteredFaqs.map((category, catIndex) => (
                  <div key={catIndex}>
                    <h3 className="text-lg font-semibold mb-3">
                      {category.category}
                    </h3>

                    <Accordion type="single" collapsible className="space-y-2">
                      {category.questions.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${catIndex}-${index}`}
                          className="bg-card border rounded-xl px-4"
                        >
                          <AccordionTrigger className="text-left py-4">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-4">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No FAQs found. Try asking our counselor.
                  </div>
                )}
              </div>
            </div>

            {/* ===== CHATBOT ===== */}
            <div className="sticky top-24 h-[600px]">
              <ChatbotUI />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
