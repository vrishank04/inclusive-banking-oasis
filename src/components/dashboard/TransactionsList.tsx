
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatCurrency, formatDate } from '@/utils/formatters';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
  category: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  return (
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
  );
};

export default TransactionsList;
