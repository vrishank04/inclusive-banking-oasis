
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OfferCard from "@/components/offers/OfferCard";
import { bankingOffers } from "@/data/bankingOffers";

const RecommendedOffers: React.FC = () => {
  const navigate = useNavigate();
  
  const recommendedOffers = [
    bankingOffers.find(o => o.id === "nari-shakti"),
    bankingOffers.find(o => o.id === "tech-investor"),
  ].filter(Boolean) as typeof bankingOffers;

  return (
    <Card className="border-banking-primary/20 mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Banking offers tailored to your profile</CardDescription>
        </div>
        <Button variant="ghost" onClick={() => navigate("/offers")} className="text-banking-primary">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {recommendedOffers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedOffers;
