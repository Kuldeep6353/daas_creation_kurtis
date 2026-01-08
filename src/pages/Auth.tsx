import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome Back",
          description: "You have been logged in successfully.",
        });
        navigate("/dashboard");
      }
    } else {
      const { error } = await signUp(email, password, {
        contact_name: contactName,
        company_name: companyName,
      });
      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created",
          description: "Welcome to DAAS Creation Kurtis! Redirecting to your dashboard...",
        });
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>{isLogin ? "Client Login" : "Register"} | DAAS Creation Kurtis</title>
        <meta name="description" content="Login to your DAAS Creation Kurtis client portal to manage your manufacturing orders and communicate with our team." />
      </Helmet>

      <section className="py-20 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg card-glow">
              <div className="flex justify-center mb-8">
                <Logo imageClassName="h-16 w-auto" />
              </div>

              <h1 className="text-2xl font-heading font-bold text-center mb-2">
                {isLogin ? "Client Login" : "Register Your Business"}
              </h1>
              <p className="text-muted-foreground text-center text-sm mb-8">
                {isLogin 
                  ? "Access your manufacturing dashboard" 
                  : "Create an account to partner with us"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Your Name</Label>
                      <Input
                        id="contactName"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company / Brand Name</Label>
                      <Input
                        id="companyName"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Your Brand Name"
                        required
                        className="bg-background"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-background"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary hover:underline"
                >
                  {isLogin 
                    ? "New partner? Register your business" 
                    : "Already have an account? Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
