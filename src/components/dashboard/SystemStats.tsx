
import React from 'react';
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  CheckCircle2,
  Activity,
  Fingerprint,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SystemStats: React.FC = () => {
  // Mock data
  const stats = [
    {
      title: 'System Status',
      value: 'Protected',
      icon: Shield,
      description: 'All security systems active',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
    {
      title: 'Active Users',
      value: '147',
      icon: Users,
      description: '12 new users this week',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Security Alerts',
      value: '3',
      icon: AlertTriangle,
      description: 'Requires your attention',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
    },
    {
      title: 'Success Rate',
      value: '99.8%',
      icon: CheckCircle2,
      description: 'For all login attempts',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SystemStats;
