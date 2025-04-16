
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type BankingOffer } from "@/data/bankingOffers";

interface OfferCardProps {
  offer: BankingOffer;
  detailed?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, detailed = false }) => {
  return (
    <Card className="h-full flex flex-col border-banking-primary/20 hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-banking-accent/30 text-banking-primary border-banking-primary/30">
            {offer.category}
          </Badge>
        </div>
        <CardTitle className="text-xl text-banking-primary mt-2">{offer.title}</CardTitle>
        <CardDescription>{offer.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground mb-4">
          <strong>Eligibility:</strong> {offer.eligibility}
        </div>
        
        {detailed && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Benefits:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {offer.benefits.map((benefit, index) => (
                <li key={index} className="text-sm">{benefit}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full border-banking-primary text-banking-primary hover:bg-banking-primary hover:text-white">
          {detailed ? "Apply Now" : "Learn More"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OfferCard;
