import { Sparkles, Star, Crown } from "lucide-react";

export const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    icon: Sparkles,
    color: 'text-gray-500',
    features: ['Basic API access', 'Limited support', '1000 API requests/day'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₦15,000',
    period: '/month',
    icon: Star,
    color: 'text-yellow-500',
    popular: true,
    features: ['Advanced API access', 'Priority support', 'Analytics dashboard', '5000 API requests/day'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '₦75,000',
    period: '/month',
    icon: Crown,
    color: 'text-purple-500',
    features: ['Full API access', 'Dedicated support', 'Custom integrations', '10000 API requests/day'],
  },
];