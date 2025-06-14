import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import UserPresence from './UserPresence';
import EditorToolbar from './EditorToolbar';
import { Save, AlertCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  color: string;
  cursor: number;
}

interface CursorUpdate {
  userId: string;
  position: number;
  user: User;
}

const DocumentEditor: React.FC = () => {
  const [content, setContent] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [cursors, setCursors] = useState<Map<string, CursorUpdate>>(new Map());
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const isTyping = useRef(false);

  useEffect(() => {
    // Connect to WebSocket server
    socketRef.current = io('http://localhost:3001');

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    socketRef.current.on('document-content', (documentContent: string) => {
      setContent(documentContent);
    });

    socketRef.current.on('user-joined', (user: User) => {
      setCurrentUser(user);
    });

    socketRef.current.on('users-update', (userList: User[]) => {
      setUsers(userList);
    });

    socketRef.current.on('text-change', (data: { content: string; userId: string; timestamp: number }) => {
      if (!isTyping.current) {
        setContent(data.content);
        setLastSaved(new Date(data.timestamp));
      }
    });

    socketRef.current.on('cursor-update', (cursorData: CursorUpdate) => {
      setCursors(prev => new Map(prev.set(cursorData.userId, cursorData)));
    });

    socketRef.current.on('user-left', (userId: string) => {
      setCursors(prev => {
        const newCursors = new Map(prev);
        newCursors.delete(userId);
        return newCursors;
      });
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    isTyping.current = true;

    // Emit text change to server
    socketRef.current?.emit('text-change', {
      content: newContent,
      timestamp: Date.now()
    });

    // Reset typing flag after a short delay
    setTimeout(() => {
      isTyping.current = false;
    }, 100);

    setLastSaved(new Date());
  };

  const handleCursorChange = () => {
    if (textareaRef.current) {
      const position = textareaRef.current.selectionStart;
      socketRef.current?.emit('cursor-change', position);
    }
  };

  const handleSave = () => {
    // Simulate save operation
    setLastSaved(new Date());
    // In a real app, you would save to a database here
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Editor Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">Untitled Document</h2>
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Live</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Disconnected</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {lastSaved && (
                <span className="text-sm text-gray-500">
                  Last saved: {formatTime(lastSaved)}
                </span>
              )}
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <EditorToolbar />

        {/* User Presence */}
        <UserPresence users={users} currentUser={currentUser} />

        {/* Editor Area */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextChange}
            onSelect={handleCursorChange}
            onKeyUp={handleCursorChange}
            onClick={handleCursorChange}
            placeholder="Start typing your document here..."
            className="w-full h-96 p-6 text-gray-900 placeholder-gray-400 border-none resize-none focus:outline-none focus:ring-0 font-mono text-sm leading-relaxed"
            style={{ minHeight: '400px' }}
          />
          
          {/* Cursor indicators for other users */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from(cursors.values()).map((cursor) => (
              <div
                key={cursor.userId}
                className="absolute w-0.5 h-5 animate-pulse"
                style={{
                  backgroundColor: cursor.user.color,
                  // This is a simplified cursor positioning - in a real app you'd need more complex logic
                  left: `${6 + (cursor.position % 80) * 8}px`,
                  top: `${24 + Math.floor(cursor.position / 80) * 20}px`,
                }}
              >
                <div
                  className="absolute -top-6 -left-2 px-2 py-1 text-xs text-white rounded shadow-lg whitespace-nowrap"
                  style={{ backgroundColor: cursor.user.color }}
                >
                  {cursor.user.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Characters: {content.length}</span>
              <span>Words: {content.trim() ? content.trim().split(/\s+/).length : 0}</span>
              <span>Lines: {content.split('\n').length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{users.length} user{users.length !== 1 ? 's' : ''} online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;