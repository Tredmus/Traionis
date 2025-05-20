import React from 'react';
import { Activity } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Activity className="h-8 w-8 text-primary" />
      <span className="ml-2 text-2xl font-bold tracking-tight">
        <span className="text-gray-900">Traion</span>
        <span className="text-primary">is</span>
      </span>
    </div>
  );
};

export default Logo;