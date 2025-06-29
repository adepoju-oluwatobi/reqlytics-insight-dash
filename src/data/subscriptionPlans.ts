
import { Crown, Zap, Building2 } from "lucide-react";

export const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    icon: Zap,
    color: 'text-gray-600',
    features: [
      '100 API requests per month',
      'Basic analytics',
      'Community support',
      'Standard response time'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$29',
    period: '/month',
    icon: Crown,
    color: 'text-blue-600',
    popular: true,
    features: [
      '1,000 API requests per month',
      'Advanced analytics',
      'Priority support',
      'Real-time monitoring',
      'Custom alerts'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    icon: Building2,
    color: 'text-purple-600',
    features: [
      '5,000 API requests per month',
      'Enterprise analytics',
      '24/7 dedicated support',
      'Custom integrations',
      'Advanced security',
      'SLA guarantees'
    ]
  }
];
