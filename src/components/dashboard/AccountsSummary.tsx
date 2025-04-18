
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatCurrency } from '@/utils/formatters';

interface Account {
  id: string;
  name: string;
  balance: number;
  number: string;
}

interface AccountsSummaryProps {
  accounts: Account[];
  totalExpenses: number;
  totalIncome: number;
}

const AccountsSummary: React.FC<AccountsSummaryProps> = ({ accounts, totalExpenses, totalIncome }) => {
  return (
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
  );
};

export default AccountsSummary;
