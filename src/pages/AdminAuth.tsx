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
import { Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";


export default function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, isAdmin, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);
 // new line add kari che useeffect wadi
  useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      window.location.href = "/admin";
    }
  });
}, []);


  if (error) {
    toast({
      title: "Login failed",
      description: error.message,
      variant: "destructive",
    });
  } else {
    window.location.href = "/admin";
  }
};


  return (
    <Layout>
      <Helmet>
        <title>Admin Login | DAAS Creation Kurtis</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="py-20 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>

              <h1 className="text-2xl font-heading font-bold text-center mb-2">
                Admin Access
              </h1>
              <p className="text-muted-foreground text-center text-sm mb-8">
                Authorized personnel only
              </p>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="xyz@gmail.com"
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
                  {loading ? "Verifying..." : "Access Admin Panel"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
