import React from 'react';
import { User } from 'lucide-react';

interface User {
  id: string;
  name: string;
  color: string;
  cursor: number;
}

interface UserPresenceProps {
  users: User[];
  currentUser: User | null;
}

const UserPresence: React.FC<UserPresenceProps> = ({ users, currentUser }) => {
  return (
    <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">Active Users:</span>
          <div className="flex items-center space-x-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border-2 bg-white shadow-sm transition-all hover:shadow-md"
                style={{ borderColor: user.color }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: user.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                  {user.id === currentUser?.id && ' (You)'}
                </span>
              </div>
            ))}
            {users.length === 0 && (
              <div className="flex items-center space-x-2 text-gray-500">
                <User className="w-4 h-4" />
                <span className="text-sm">No users online</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          {users.length} {users.length === 1 ? 'person' : 'people'} editing
        </div>
      </div>
    </div>
  );
};

export default UserPresence;