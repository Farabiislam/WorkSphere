import React, { use } from 'react'
import { AuthContext } from '../context/AuthContext'
import {
    ShieldCheck,
    UserCog,
    Briefcase
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HandIcon } from 'lucide-react';

const DashboardHome = () => {
    const { role } = use(AuthContext)
    const getWelcomeMessage = () => {
        switch (role) {
            case 'admin':
                return 'Welcome Admin! Ready to manage the organization?';
            case 'hr':
                return 'Welcome HR! Let’s take care of your people.';
            case 'employee':
                return 'Welcome Employee! Let’s get to work.';
            default:
                return 'Welcome!';
        }
    };
    const getIcon = () => {
        switch (role) {
            case 'admin':
                return <ShieldCheck className="mx-auto text-blue-400  w-20 h-20" />;
            case 'hr':
                return <UserCog className="mx-auto text-amber-600 w-20 h-20" />;
            case 'employee':
                return <Briefcase className="mx-auto text-green-600 w-20 h-20" />;
            default:
                return <HandIcon className="mx-auto text-blue-400 w-20 h-20" />;
        }
    };
  return (
      <div className="flex justify-center items-center min-h-[80vh] px-4">
          <Card className="max-w-xl w-full shadow-lg rounded-xl">
              <CardHeader className="text-center space-y-4">
                  {getIcon()}
                  <CardTitle className="text-2xl font-bold">{getWelcomeMessage()}</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground text-center">
                     You are Logged in as <span className="font-semibold">{role || 'unknown'}</span>
                  </p>
              </CardContent>
          </Card>
      </div>
  )
}

export default DashboardHome