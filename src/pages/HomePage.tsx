import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, TrendingUp, Users, Shield, ArrowRight } from "lucide-react";
import { bankingOffers } from "@/data/bankingOffers";
import OfferCard from "@/components/offers/OfferCard";

const HomePage: React.FC = () => {
  // Select a few featured offers to display
  const featuredOffers = [
    bankingOffers.find(o => o.id === "nari-shakti"),
    bankingOffers.find(o => o.id === "business-elite"),
    bankingOffers.find(o => o.id === "young-achievers")
  ].filter(Boolean) as typeof bankingOffers;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-banking-dark text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 md:text-5xl lg:text-6xl">
              Banking Solutions <span className="banking-gradient bg-clip-text text-transparent">Tailored For You</span>
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Discover specialized banking offers designed to meet your unique financial needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                <Link to="/offers">Explore Offers</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-banking-primary">Why Choose Inclusive Banking?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-banking-primary/20">
              <CardContent className="pt-8">
                <div className="rounded-full w-12 h-12 banking-gradient flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Inclusive Offers</h3>
                <p className="text-gray-600">
                  Banking solutions designed for every segment of society, from women entrepreneurs to senior citizens.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-banking-primary/20">
              <CardContent className="pt-8">
                <div className="rounded-full w-12 h-12 banking-gradient flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Growth Focused</h3>
                <p className="text-gray-600">
                  Programs specifically designed to accelerate your business growth and personal wealth.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-banking-primary/20">
              <CardContent className="pt-8">
                <div className="rounded-full w-12 h-12 banking-gradient flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Banking</h3>
                <p className="text-gray-600">
                  State-of-the-art security measures to protect your financial information and transactions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-banking-primary/20">
              <CardContent className="pt-8">
                <div className="rounded-full w-12 h-12 banking-gradient flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Process</h3>
                <p className="text-gray-600">
                  Simplified application procedures and user-friendly digital banking experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Offers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-banking-primary">Featured Offers</h2>
            <Button asChild variant="ghost" className="text-banking-primary">
              <Link to="/offers" className="flex items-center">
                View All Offers <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredOffers.map(offer => (
              <OfferCard key={offer.id} offer={offer} detailed={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-banking-primary">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-banking-primary/20">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-banking-accent mb-4"></div>
                  <p className="text-gray-600 mb-4">
                    "The Women's Financial Growth Plan helped me expand my boutique business. The lower processing fees and advisory services were invaluable."
                  </p>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-banking-primary/20">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-banking-accent mb-4"></div>
                  <p className="text-gray-600 mb-4">
                    "As a senior citizen, the higher fixed deposit rates and priority banking have made my retirement finances much more manageable."
                  </p>
                  <h4 className="font-semibold">Raj Kapoor</h4>
                  <p className="text-sm text-gray-500">Retired Professor</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-banking-primary/20">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-banking-accent mb-4"></div>
                  <p className="text-gray-600 mb-4">
                    "Through the MUDRA Yojana program, I was able to secure funding for my small manufacturing business without collateral requirements."
                  </p>
                  <h4 className="font-semibold">Arjun Mehta</h4>
                  <p className="text-sm text-gray-500">Entrepreneur</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 banking-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Inclusive Banking today and discover banking solutions tailored to your unique needs.
          </p>
          <Button asChild size="lg" className="bg-white text-banking-primary hover:bg-gray-100">
            <Link to="/login">Open an Account</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
