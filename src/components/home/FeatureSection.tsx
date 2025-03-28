
import React from 'react';
import { 
  Shield, 
  Lock, 
  Fingerprint, 
  Zap, 
  Eye, 
  Users, 
  AlertTriangle,
  Smartphone 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Multi-layered protection that keeps your digital identity safe from threats.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Fingerprint,
    title: 'MAC Address Verification',
    description: 'Unique device fingerprinting ensures only your authorized devices can access your account.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Performance',
    description: 'Our security measures work silently in the background without slowing you down.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Eye,
    title: 'Real-time Monitoring',
    description: 'Get instant alerts when suspicious activities are detected on your account.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Easily manage security permissions for your entire organization in one place.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: AlertTriangle,
    title: 'Threat Prevention',
    description: 'Proactive security measures that prevent attacks before they happen.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Access your secure dashboard from any device with our responsive interface.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Lock,
    title: 'Privacy Focused',
    description: 'Your data stays yours - we prioritize privacy with end-to-end encryption.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight animate-fade-in">
            Security that's Actually <span className="text-primary">Lovable</span>
          </h2>
          <p className="text-muted-foreground mt-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            We've reimagined security to be both powerful and user-friendly, 
            with features that protect without getting in your way.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-pop"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardHeader>
                <div className={`p-3 w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-3`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
