
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import AccountsSummary from "@/components/dashboard/AccountsSummary";
import TransactionsList from "@/components/dashboard/TransactionsList";
import QuickActions from "@/components/dashboard/QuickActions";
import RecommendedOffers from "@/components/dashboard/RecommendedOffers";
import { useDashboardData } from "@/hooks/useDashboardData";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { 
    accounts, 
    transactions, 
    isLoading, 
    totalExpenses, 
    totalIncome 
  } = useDashboardData();

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
    navigate("/login");
    return null;
  }

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
