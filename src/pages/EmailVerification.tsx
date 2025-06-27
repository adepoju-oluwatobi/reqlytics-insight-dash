import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/base_url";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/verify?token=${token}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setStatus("success");
          setMessage("Your email has been verified successfully!");
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed. Token may be invalid or expired.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("Missing verification token.");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 p-6">
      <Card className="w-full max-w-md border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-muted-foreground">Verifying your email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
              <p className="text-green-700 font-medium">{message}</p>
              <Button asChild>
                <Link to="/login">Proceed to Login</Link>
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-2">
              <XCircle className="h-10 w-10 text-red-600" />
              <p className="text-red-700 font-medium">{message}</p>
              <Button asChild variant="outline">
                <Link to="/signup">Back to Signup</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
