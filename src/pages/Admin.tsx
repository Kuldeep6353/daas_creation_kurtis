import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast, useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Package, 
  MessageSquare, 
  LogOut,
  Search,
  Eye,
  ChevronDown,
  FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Client {
  id: string;
  user_id: string;
  company_name: string | null;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  business_type: string | null;
  created_at: string;
}

interface Order {
  id: string;
  order_number: string;
  user_id: string;
  product_type: string | null;
  quantity: number | null;
  status: string;
  notes: string | null;
  created_at: string;
  profiles?: {
    company_name: string | null;
  };
}

interface Conversation {
  id: string;
  user_id: string;
  subject: string | null;
  status: string;
  created_at: string;
  client_name: string | null;
  client_email: string | null;
}

interface Inquiry {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  business_type: string | null;
  quantity: string | null;
  product_type: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const statusOptions = [
  "pending",
  "confirmed",
  "production",
  "quality_check",
  "dispatched",
  "delivered",
];

export default function Admin() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"clients" | "orders" | "chats" | "inquiries">("clients");
  const [clients, setClients] = useState<Client[]>([]);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
const ADMIN_EMAIL = "djkuldeepahir@gmail.com";

useEffect(() => {
  if (authLoading) return;

  if (!user) {
    navigate("/admin/login");
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    toast({
      title: "Access Denied",
      description: "You are not authorized as admin",
      variant: "destructive",
    });

    supabase.auth.signOut();
    navigate("/");
  }
}, [authLoading, user]);






  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "clients") {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        setClients(data || []);
      } 
       else if (activeTab === "chats") {
        // First fetch conversations
        const { data: convData } = await supabase
          .from('chat_conversations')
          .select('*')
          .order('updated_at', { ascending: false });
        
        if (convData && convData.length > 0) {
          // Get unique user_ids from conversations
          const userIds = [...new Set(convData.map(c => c.user_id))];
          
          // Fetch profiles for those users
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('user_id, contact_name, email')
            .in('user_id', userIds);
          
          // Create a map of user_id to profile data
          const profileMap = new Map(
            (profilesData || []).map(p => [p.user_id, { contact_name: p.contact_name, email: p.email }])
          );
          
          // Map conversations with client info
          const conversationsWithProfiles = convData.map(c => ({
            ...c,
            client_name: profileMap.get(c.user_id)?.contact_name || null,
            client_email: profileMap.get(c.user_id)?.email || null,
          }));
          
          setConversations(conversationsWithProfiles);
        } else {
          setConversations([]);
        }
      } else if (activeTab === "inquiries") {
        const { data } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        setInquiries(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  {/*const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Order status changed to ${newStatus}`,
      });

      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  }; */}

  const updateInquiryStatus = async (
  inquiryId: string,
  newStatus: string
) => {
  try {
    const { error } = await supabase
      .from("inquiries")
      .update({ status: newStatus })
      .eq("id", inquiryId);

    if (error) throw error;


    toast({
      title: "Status Updated",
      description: `Inquiry marked as ${newStatus}`,
    });

    fetchData(); // table refresh
  } catch (error) {
    console.error("Error updating inquiry:", error);
    toast({
      title: "Error",
      description: "Failed to update inquiry status",
      variant: "destructive",
    });
  }
};


  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Verifying access...</div>
        </div>
      </Layout>
    );
  }

  const filteredClients = clients.filter(c => 
    c.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const filteredInquiries = inquiries.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Helmet>
        <title>Admin Dashboard | DAAS Creation Kurtis</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="py-12 min-h-screen bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Admin Panel</p>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                Dashboard
              </h1>
            </div>
            <Button variant="ghost" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("clients")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "clients" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Clients
            </button>
             
            {/* Orders tab disabled for now 

            <button
            

              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "orders" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Package className="h-4 w-4" />
              Orders
            </button> */}
            <button
              onClick={() => setActiveTab("chats")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "chats" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Chats
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "inquiries" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-4 w-4" />
              Inquiries
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : (
            <>
              {/* Clients Tab */}
              {activeTab === "clients" && (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Company</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Contact</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Phone</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((client) => (
                        <tr key={client.id} className="border-t border-border hover:bg-muted/10">
                          <td className="p-4 text-sm font-medium">{client.company_name || "-"}</td>
                          <td className="p-4 text-sm">{client.contact_name || "-"}</td>
                          <td className="p-4 text-sm">{client.email || "-"}</td>
                          <td className="p-4 text-sm">{client.phone || "-"}</td>
                          <td className="p-4 text-sm">{client.business_type || "-"}</td>
                          <td className="p-4 text-sm">
                            {new Date(client.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredClients.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No clients found
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Order #</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Client</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Qty</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                  </table>
                 
                </div>
              )}

              {/* Chats Tab */}
              {activeTab === "chats" && (
                <div className="space-y-4">
                  {conversations.length === 0 ? (
                    <div className="bg-card border border-border rounded-2xl p-12 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No conversations yet</p>
                    </div>
                  ) : (
                    conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => navigate(`/admin/chat/${conv.id}`)}
                        className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{conv.client_name || "Unknown Client"}</p>
                            <p className="text-sm text-muted-foreground">
                              {conv.client_email || "No email"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {conv.subject || "General Inquiry"}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              conv.status === 'open' 
                                ? "bg-green-500/10 text-green-600" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {conv.status}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(conv.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Inquiries Tab */}
              {activeTab === "inquiries" && (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Company</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Phone</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Business Type</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Quantity</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="border-t border-border hover:bg-muted/10">
                            <td className="p-4 text-sm font-medium">{inquiry.name}</td>
                            <td className="p-4 text-sm">{inquiry.company || "-"}</td>
                            <td className="p-4 text-sm">{inquiry.email}</td>
                            <td className="p-4 text-sm">{inquiry.phone || "-"}</td>
                            <td className="p-4 text-sm">{inquiry.business_type || "-"}</td>
                            <td className="p-4 text-sm">{inquiry.quantity || "-"}</td>
                            <td className="p-4 text-sm">{inquiry.product_type || "-"}</td>
                            <td className="p-4">
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                inquiry.status === 'new' 
                                  ? "bg-green-500/10 text-green-600" 
                                  : inquiry.status === 'contacted'
                                  ? "bg-blue-500/10 text-blue-600"
                                  : "bg-muted text-muted-foreground"
                              }`}>
                               <select
                                  value={inquiry.status}
                                  onChange={(e) =>
                                       updateInquiryStatus(inquiry.id, e.target.value)
                                     }
                                   className="border border-border rounded px-2 py-1 text-sm bg-background"
                                  >
                                     <option value="new">New</option>
                                     <option value="contacted">Contacted</option>
                                     <option value="converted">Converted</option>
                                     <option value="rejected">Rejected</option>
                                  </select>

                              </span>
                            </td>
                            <td className="p-4 text-sm">
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredInquiries.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No inquiries found
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
