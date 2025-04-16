
export interface BankingOffer {
  id: string;
  title: string;
  description: string;
  category: string;
  eligibility: string;
  benefits: string[];
  image: string;
}

export const bankingOffers: BankingOffer[] = [
  {
    id: "legacy-customer",
    title: "Legacy Customer Privilege",
    description: "Exclusive benefits for our long-term customers",
    category: "Loyalty",
    eligibility: "Customers banking with us for 10+ years or having a credit return of ₹1 lakh+",
    benefits: [
      "Yearly travel/hotel discounts with partner brands",
      "Discounted debit/credit card with premium benefits",
      "Priority customer service"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "nari-shakti",
    title: "Nari Shakti Banking Privileges",
    description: "Empowering women through financial services",
    category: "Women",
    eligibility: "Women customers",
    benefits: [
      "0.5%-1% higher savings interest rates for steady deposits (3+ years)",
      "Lower personal & home loan interest rates",
      "Free investment advisory & business guidance"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "mahila-udyam",
    title: "Mahila Udyam Nidhi Yojana",
    description: "Supporting women entrepreneurs",
    category: "Women",
    eligibility: "Women entrepreneurs & small business owners",
    benefits: [
      "Loans up to ₹10 lakh at subsidized interest rates",
      "Financial training for women in small-scale industries",
      "No collateral required, with flexible repayment"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "business-elite",
    title: "Business Elite Offer",
    description: "Premium services for established businesses",
    category: "Business",
    eligibility: "Business accounts with steady turnover of ₹50 lakh+ for 2+ years",
    benefits: [
      "Discounted business loans",
      "Free international transactions",
      "Free payroll processing with minimum balance"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "entrepreneur-growth",
    title: "Entrepreneur Growth Accelerator",
    description: "Supporting growing businesses",
    category: "Business",
    eligibility: "Startups with 3+ years of continuous transactions and steady growth",
    benefits: [
      "Priority funding options & lower interest rates",
      "Free business credit card with cashback",
      "Discounted legal & compliance advisory services"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "mudra-yojana",
    title: "MUDRA Yojana",
    description: "Micro & Small Business Finance",
    category: "Business",
    eligibility: "Small businesses & rural entrepreneurs",
    benefits: [
      "Loans up to ₹10 lakh for micro enterprises",
      "No collateral required for loans under ₹10 lakh",
      "Financial inclusion for urban & rural areas"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "senior-citizen",
    title: "Senior Citizen Care Package",
    description: "Specialized care for our elderly customers",
    category: "Seniors",
    eligibility: "Customers aged 60+ with long-term accounts",
    benefits: [
      "Higher fixed deposit rates",
      "Priority banking with dedicated managers",
      "Discounts on medical insurance and health checkups"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "young-achievers",
    title: "Young Achievers Program",
    description: "Supporting the next generation",
    category: "Youth",
    eligibility: "Students or professionals under 30 with active transactions for 2+ years",
    benefits: [
      "Fee waivers on education loans",
      "Free financial literacy workshops",
      "Startup assistance grants"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "sustainable-banking",
    title: "Sustainable Banking Rewards",
    description: "Benefits for eco-conscious customers",
    category: "Sustainability",
    eligibility: "Customers with eco-friendly banking practices for 3+ years",
    benefits: [
      "Lower interest on green home loans",
      "Discounted rates for electric vehicles",
      "Rewards for sustainable banking habits"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "nri-homecoming",
    title: "NRI Homecoming Privilege",
    description: "Special benefits for non-resident Indians",
    category: "NRI",
    eligibility: "NRIs with active accounts and remittances for 5+ years",
    benefits: [
      "Lower remittance fees and priority forex rates",
      "Special home loan offers for property in India",
      "Dedicated relationship manager"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "agriculture-plan",
    title: "Agriculture Prosperity Plan",
    description: "Supporting farmers and agribusinesses",
    category: "Agriculture",
    eligibility: "Farmers with consistent transactions & loan repayments for 3+ years",
    benefits: [
      "Reduced interest rates on agri-loans",
      "Subsidized insurance premiums for crop protection",
      "Discounts on farm equipment"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "tech-investor",
    title: "Tech-Savvy Investor Bonus",
    description: "Rewards for digital banking users",
    category: "Digital",
    eligibility: "Customers using digital banking & investing platforms for 2+ years",
    benefits: [
      "No brokerage fees on select investments",
      "Higher interest rates on digital-only accounts",
      "Early access to new fintech features"
    ],
    image: "/placeholder.svg"
  }
];

export const getOffersByCategory = (category: string): BankingOffer[] => {
  return bankingOffers.filter(offer => offer.category === category);
};

export const categories = [
  "All",
  "Women", 
  "Business", 
  "Loyalty", 
  "Seniors", 
  "Youth", 
  "Sustainability",
  "NRI",
  "Agriculture",
  "Digital"
];
