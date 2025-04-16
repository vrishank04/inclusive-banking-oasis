
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, PieChart, CreditCard, ArrowUpRight, ArrowDownRight, Clock, Banknote } from "lucide-react";
import { bankingOffers } from "@/data/bankingOffers";
import OfferCard from "@/components/offers/OfferCard";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
  category: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      // Redirect to login if no user is found
      navigate("/login");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  // Mock account data
  const accounts = [
    { id: "savings", name: "Savings Account", balance: 45782.36, number: "XXXX1234" },
    { id: "current", name: "Current Account", balance: 12450.75, number: "XXXX5678" },
  ];

  // Mock recent transactions
  const recentTransactions: Transaction[] = [
    { id: "t1", description: "Salary Credit", amount: 50000, date: "2025-04-15", type: "credit", category: "Income" },
    { id: "t2", description: "Electricity Bill", amount: 2450, date: "2025-04-14", type: "debit", category: "Utilities" },
    { id: "t3", description: "Grocery Store", amount: 3250, date: "2025-04-12", type: "debit", category: "Shopping" },
    { id: "t4", description: "Interest Credit", amount: 782.36, date: "2025-04-10", type: "credit", category: "Interest" },
    { id: "t5", description: "Restaurant Payment", amount: 1840, date: "2025-04-08", type: "debit", category: "Dining" },
  ];

  // Get recommended offers based on user data (mock logic)
  const recommendedOffers = [
    bankingOffers.find(o => o.id === "nari-shakti"),
    bankingOffers.find(o => o.id === "tech-investor"),
  ].filter(Boolean) as typeof bankingOffers;

  if (!user) {
    return null; // Will redirect to login
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-banking-primary">Welcome back, {user.name}</h1>
          <p className="text-gray-600">Here's a summary of your accounts and recommended offers.</p>
        </div>

        {/* Account Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {accounts.map(account => (
            <Card key={account.id} className="border-banking-primary/20">
              <CardHeader className="pb-2">
                <CardDescription>{account.name}</CardDescription>
                <CardTitle className="text-2xl">{formatCurrency(account.balance)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Account: {account.number}</p>
              </CardContent>
            </Card>
          ))}
          
          <Card className="border-banking-primary/20">
            <CardHeader className="pb-2">
              <CardDescription>Total Expenses (This Month)</CardDescription>
              <CardTitle className="text-2xl">₹7,540.00</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              <p className="text-sm text-red-500">12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="border-banking-primary/20">
            <CardHeader className="pb-2">
              <CardDescription>Total Income (This Month)</CardDescription>
              <CardTitle className="text-2xl">₹50,782.36</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-sm text-green-500">5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7 mb-8">
          {/* Recent Transactions */}
          <Card className="border-banking-primary/20 md:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent account activity</CardDescription>
              </div>
              <Button variant="ghost" onClick={() => {}} className="text-banking-primary">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full mr-4 flex items-center justify-center ${
                        transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                      }`}>
                        {transaction.type === "credit" ? (
                          <ArrowUpRight className={`h-5 w-5 text-green-600`} />
                        ) : (
                          <ArrowDownRight className={`h-5 w-5 text-red-600`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className={`text-right ${
                      transaction.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.type === "credit" ? "+" : "-"}{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-banking-primary/20 md:col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common banking tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button variant="outline" className="justify-start text-banking-primary border-banking-primary hover:bg-banking-primary/10">
                <Banknote className="mr-2 h-4 w-4" /> Transfer Money
              </Button>
              <Button variant="outline" className="justify-start text-banking-primary border-banking-primary hover:bg-banking-primary/10">
                <CreditCard className="mr-2 h-4 w-4" /> Pay Credit Card Bill
              </Button>
              <Button variant="outline" className="justify-start text-banking-primary border-banking-primary hover:bg-banking-primary/10">
                <Clock className="mr-2 h-4 w-4" /> Schedule Payment
              </Button>
              <Button variant="outline" className="justify-start text-banking-primary border-banking-primary hover:bg-banking-primary/10">
                <PieChart className="mr-2 h-4 w-4" /> View Spending Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Offers */}
        <Card className="border-banking-primary/20 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Banking offers tailored to your profile</CardDescription>
            </div>
            <Button variant="ghost" onClick={() => navigate("/offers")} className="text-banking-primary">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendedOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;
