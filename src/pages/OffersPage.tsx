
import React from "react";
import Layout from "@/components/layout/Layout";
import OffersGrid from "@/components/offers/OffersGrid";

const OffersPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-banking-primary mb-4">Banking Offers & Programs</h1>
          <p className="text-gray-600">
            Explore our specialized banking solutions designed for different customer segments. 
            From women entrepreneurs to senior citizens, we have tailored offers to meet your unique needs.
          </p>
        </div>
        
        <OffersGrid />
      </div>
    </Layout>
  );
};

export default OffersPage;
