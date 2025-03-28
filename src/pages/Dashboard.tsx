
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SystemStats from '@/components/dashboard/SystemStats';
import { CheckCircle2, Lock, Shield, AlertTriangle, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock recent activities
  const activities = [
    {
      id: 1,
      title: 'Successful login',
      description: 'Login from your registered device',
      time: '1 hour ago',
      icon: CheckCircle2,
      color: 'text-emerald-500'
    },
    {
      id: 2,
      title: 'Password updated',
      description: 'Your account password was updated',
      time: '2 days ago',
      icon: Lock,
      color: 'text-primary'
    },
    {
      id: 3,
      title: 'Security scan completed',
      description: 'No threats detected in your account',
      time: '5 days ago',
      icon: Shield,
      color: 'text-blue-500'
    },
    {
      id: 4,
      title: 'Failed login attempt',
      description: 'Unrecognized device blocked',
      time: '1 week ago',
      icon: AlertTriangle,
      color: 'text-amber-500'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your security.</p>
      </div>
      
      <SystemStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Security Status</CardTitle>
            <CardDescription>Your current security overview and risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="font-medium">Overall Security Score</div>
                  <div className="text-emerald-500 font-semibold">92/100</div>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3" />
                  <div>
                    <div className="font-medium">MAC Address Verified</div>
                    <div className="text-sm text-muted-foreground">Device authentication complete</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <Lock className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <div className="font-medium">Strong Password</div>
                    <div className="text-sm text-muted-foreground">Last updated 30 days ago</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Shield className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <div className="font-medium">Privacy Protected</div>
                    <div className="text-sm text-muted-foreground">All connections are secure</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                  <div>
                    <div className="font-medium">Recommendation</div>
                    <div className="text-sm text-muted-foreground">Enable two-factor authentication</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`mt-1 ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">{activity.description}</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
