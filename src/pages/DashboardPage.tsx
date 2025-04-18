import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, PieChart, CreditCard, ArrowUpRight, ArrowDownRight, Clock, Banknote } from "lucide-react";
import { bankingOffers } from "@/data/bankingOffers";
import OfferCard from "@/components/offers/OfferCard";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Account {
  id: string;
  name: string;
  balance: number;
  number: string;
}

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
  const { user, isLoading: authLoading } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      const fetchAccountsAndTransactions = async () => {
        setIsLoading(true);
        try {
          // This would be replaced with Spring Boot API calls
          // Example: const accountsResponse = await axios.get('/api/accounts');
          // Example: const transactionsResponse = await axios.get('/api/transactions');
          
          // For now, we'll use mock data similar to the Spring Boot implementation
          const defaultAccounts: Account[] = [
            { 
              id: '1',
              name: 'Savings Account', 
              number: generateRandomAccountNumber(),
              balance: 45782.36 
            },
            { 
              id: '2',
              name: 'Current Account', 
              number: generateRandomAccountNumber(),
              balance: 12450.75 
            }
          ];
          
          setAccounts(defaultAccounts);
          
          const defaultTransactions: Transaction[] = [
            { 
              id: '1',
              description: 'Salary Credit', 
              amount: 50000, 
              date: new Date().toISOString(),
              type: 'credit', 
              category: 'Income' 
            },
            { 
              id: '2',
              description: 'Electricity Bill', 
              amount: 2450, 
              date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
              type: 'debit', 
              category: 'Utilities' 
            },
            { 
              id: '3',
              description: 'Grocery Store', 
              amount: 3250, 
              date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              type: 'debit', 
              category: 'Shopping' 
            },
            { 
              id: '4',
              description: 'Interest Credit', 
              amount: 782.36, 
              date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
              type: 'credit', 
              category: 'Interest' 
            },
            { 
              id: '5',
              description: 'Restaurant Payment', 
              amount: 1840, 
              date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
              type: 'debit', 
              category: 'Dining' 
            }
          ];
          
          setTransactions(defaultTransactions);
        } catch (error: any) {
          console.error('Error fetching data:', error);
          toast({
            title: 'Error fetching data',
            description: error.message || 'Failed to load your banking data',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchAccountsAndTransactions();
    }
  }, [user, authLoading, navigate, toast]);

  const generateRandomAccountNumber = () => {
    return 'XXXX' + Math.floor(1000 + Math.random() * 9000);
  };

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

  const recommendedOffers = [
    bankingOffers.find(o => o.id === "nari-shakti"),
    bankingOffers.find(o => o.id === "tech-investor"),
  ].filter(Boolean) as typeof bankingOffers;

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-banking-primary">Loading your banking dashboard...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  const totalExpenses = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + Number(t.amount), 0);
    
  const totalIncome = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-banking-primary">Welcome back, {user.user_metadata.name || user.email}</h1>
          <p className="text-gray-600">Here's a summary of your accounts and recommended offers.</p>
        </div>

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
              <CardTitle className="text-2xl">{formatCurrency(totalExpenses)}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              <p className="text-sm text-red-500">12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="border-banking-primary/20">
            <CardHeader className="pb-2">
              <CardDescription>Total Income (This Month)</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(totalIncome)}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-sm text-green-500">5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7 mb-8">
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
                {transactions.map(transaction => (
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
