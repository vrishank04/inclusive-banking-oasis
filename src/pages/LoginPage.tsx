
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage: React.FC = () => {
  return (
    <Layout hideFooter>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 text-banking-primary">Welcome to <span className="banking-gradient bg-clip-text text-transparent">Inclusive Banking</span></h1>
            <p className="text-lg text-gray-600 mb-8">
              Experience banking that understands your unique needs and aspirations. Login or create an account to access our specialized offers.
            </p>
            
            <div className="space-y-4">
              <Card className="border-banking-primary/20">
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="mt-1 text-banking-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Personalized Banking Solutions</h3>
                    <p className="text-sm text-gray-600">Banking offers tailored to your specific demographic and needs.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-banking-primary/20">
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="mt-1 text-banking-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Exclusive Financial Benefits</h3>
                    <p className="text-sm text-gray-600">Enjoy special interest rates, fee waivers, and discounted services.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-banking-primary/20">
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="mt-1 text-banking-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dedicated Support</h3>
                    <p className="text-sm text-gray-600">Get assistance from advisors who understand your specific financial journey.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <p className="mt-8 text-sm text-gray-500">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-banking-secondary hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-banking-secondary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <AuthForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
