
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, Clock, CreditCard, PieChart } from "lucide-react";

const QuickActions: React.FC = () => {
  return (
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
  );
};

export default QuickActions;
