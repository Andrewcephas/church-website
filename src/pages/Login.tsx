import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Home } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center px-4 relative">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/"><Home className="h-4 w-4 mr-2" /> Back to Home</Link>
        </Button>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src="/images/gpc-logo.jpg" alt="GPC Logo" className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-4 border-secondary" />
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" /> Admin Login
          </CardTitle>
          <p className="text-muted-foreground text-sm">Global Power Church Management System</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@globalpowerchurch.org" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password">Password (Phone no. if new)</Label>
                <Button 
                  variant="link" 
                  className="px-0 font-normal h-auto text-xs text-muted-foreground" 
                  type="button" 
                  onClick={() => alert("Please contact the Bishop or System Administrator to reset your password.")}
                >
                  Forgot password?
                </Button>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
