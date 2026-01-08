import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  LogOut,
  FileText,
  TrendingUp
} from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  product_type: string | null;
  quantity: number | null;
  status: string;
  created_at: string;
}

interface Profile {
  company_name: string | null;
  contact_name: string | null;
}

const statusSteps = [
  { key: "pending", label: "Order Received", icon: FileText },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "production", label: "In Production", icon: TrendingUp },
  { key: "quality_check", label: "Quality Check", icon: CheckCircle2 },
  { key: "dispatched", label: "Dispatched", icon: Package },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("contact_name, company_name, email")
      .eq("user_id", user?.id)
      .maybeSingle();

    setProfile(profileData);
    } catch (error) {
    console.error("Error fetching profile:", error);
    } finally {
    setLoading(false);
    }
  };


  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(s => s.key === status);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const completedOrders = orders.filter(o => o.status === 'delivered');

  return (
    <Layout>
      <Helmet>
        <title>Client Dashboard | DAAS Creation Kurtis</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="py-12 min-h-screen bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Welcome back,</p>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
               {profile?.contact_name || profile?.company_name || "Partner"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/dashboard/chat")}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Chat with Us
              </Button>
              <Button variant="ghost" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow card-glow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                  <p className="text-3xl font-heading font-bold text-foreground">
                    {activeOrders.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow card-glow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed Orders</p>
                  <p className="text-3xl font-heading font-bold text-foreground">
                    {completedOrders.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow card-glow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/50 rounded-xl">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-3xl font-heading font-bold text-foreground">
                    {orders.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Orders with Timeline */}
          <div className="mb-12">
            <h2 className="text-xl font-heading font-semibold mb-6">Active Orders</h2>
            {activeOrders.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active orders</p>
                <Button 
                  variant="hero" 
                  className="mt-4"
                  onClick={() => navigate("/contact")}
                >
                  Place Manufacturing Inquiry
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {activeOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Order #{order.order_number}</p>
                        <p className="text-lg font-medium">{order.product_type || "Custom Order"}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {order.quantity?.toLocaleString() || "TBD"} pcs
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Ordered: {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="relative">
                      <div className="flex justify-between items-center">
                        {statusSteps.map((step, index) => {
                          const currentIndex = getStatusIndex(order.status);
                          const isCompleted = index <= currentIndex;
                          const isCurrent = index === currentIndex;
                          
                          return (
                            <div key={step.key} className="flex flex-col items-center flex-1">
                              <div 
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                  isCompleted 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-muted text-muted-foreground"
                                } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                              >
                                <step.icon className="h-5 w-5" />
                              </div>
                              <p className={`text-xs mt-2 text-center ${
                                isCompleted ? "text-primary font-medium" : "text-muted-foreground"
                              }`}>
                                {step.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      {/* Progress Line */}
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ 
                            width: `${(getStatusIndex(order.status) / (statusSteps.length - 1)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order History */}
          {completedOrders.length > 0 && (
            <div>
              <h2 className="text-xl font-heading font-semibold mb-6">Order History</h2>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Order #</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Quantity</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedOrders.map((order) => (
                      <tr key={order.id} className="border-t border-border">
                        <td className="p-4 text-sm">{order.order_number}</td>
                        <td className="p-4 text-sm">{order.product_type || "Custom"}</td>
                        <td className="p-4 text-sm">{order.quantity?.toLocaleString() || "-"}</td>
                        <td className="p-4 text-sm">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 text-xs rounded-full">
                            <CheckCircle2 className="h-3 w-3" />
                            Delivered
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
