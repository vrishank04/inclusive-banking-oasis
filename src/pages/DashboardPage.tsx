
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AccountsSummary from "@/components/dashboard/AccountsSummary";
import TransactionsList from "@/components/dashboard/TransactionsList";
import QuickActions from "@/components/dashboard/QuickActions";
import RecommendedOffers from "@/components/dashboard/RecommendedOffers";
import { generateRandomAccountNumber } from "@/utils/formatters";

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
          <h1 className="text-3xl font-bold text-banking-primary">
            Welcome back, {user.user_metadata.name || user.email}
          </h1>
          <p className="text-gray-600">Here's a summary of your accounts and recommended offers.</p>
        </div>

        <AccountsSummary 
          accounts={accounts}
          totalExpenses={totalExpenses}
          totalIncome={totalIncome}
        />

        <div className="grid gap-6 md:grid-cols-7 mb-8">
          <TransactionsList transactions={transactions} />
          <QuickActions />
        </div>

        <RecommendedOffers />
      </div>
    </Layout>
  );
};

export default DashboardPage;
