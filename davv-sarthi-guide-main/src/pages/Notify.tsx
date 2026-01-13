import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Bell, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Notify = () => {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = () => {
    if (!email) return;

    // 🔔 Temporary storage (API later)
    localStorage.setItem("notify_email", email);
    setSaved(true);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-16 px-4 space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Bell className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">
            Get Admission Alerts
          </h1>
          <p className="text-muted-foreground">
            Stay updated about important admission dates and announcements
          </p>
        </div>

        {/* Form */}
        <div className="bg-card border rounded-2xl p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Notify Me
          </Button>

          {saved && (
            <div className="flex items-center gap-2 text-success text-sm">
              <MailCheck className="w-4 h-4" />
              You will be notified about important dates.
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground text-center">
          You will receive notifications for:
          <br />
          • Counseling dates  
          • Merit list release  
          • Document verification  
          • Fee submission deadlines
        </div>

      </div>
    </Layout>
  );
};

export default Notify;
