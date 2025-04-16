
import React, { useState } from "react";
import { bankingOffers, categories } from "@/data/bankingOffers";
import OfferCard from "@/components/offers/OfferCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OffersGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredOffers = selectedCategory === "All" 
    ? bankingOffers 
    : bankingOffers.filter(offer => offer.category === selectedCategory);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="All" onValueChange={setSelectedCategory}>
        <TabsList className="flex flex-wrap h-auto mb-6">
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="data-[state=active]:bg-banking-primary data-[state=active]:text-white"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="m-0">
            {category === selectedCategory && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OffersGrid;
