
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoanChatbot from "../chatbot/LoanChatbot";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
      <LoanChatbot />
    </div>
  );
};

export default Layout;
