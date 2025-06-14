import React from 'react';
import { FileText, Users, Wifi } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CollabEdit</h1>
              <p className="text-sm text-gray-500">Real-time collaborative editor</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-600">
              <Wifi className="w-4 h-4" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;