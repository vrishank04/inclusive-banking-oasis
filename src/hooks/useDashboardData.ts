
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { generateRandomAccountNumber } from '@/utils/formatters';

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

interface DashboardData {
  accounts: Account[];
  transactions: Transaction[];
  isLoading: boolean;
  totalExpenses: number;
  totalIncome: number;
}

export const useDashboardData = (): DashboardData => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
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
  }, [toast]);

  const totalExpenses = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + Number(t.amount), 0);
    
  const totalIncome = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return {
    accounts,
    transactions,
    isLoading,
    totalExpenses,
    totalIncome
  };
};
