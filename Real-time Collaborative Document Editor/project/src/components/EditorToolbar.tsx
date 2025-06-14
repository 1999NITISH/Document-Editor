import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code
} from 'lucide-react';

const EditorToolbar: React.FC = () => {
  const toolbarButtons = [
    { icon: Bold, label: 'Bold', shortcut: 'Ctrl+B' },
    { icon: Italic, label: 'Italic', shortcut: 'Ctrl+I' },
    { icon: Underline, label: 'Underline', shortcut: 'Ctrl+U' },
    { icon: AlignLeft, label: 'Align Left' },
    { icon: AlignCenter, label: 'Align Center' },
    { icon: AlignRight, label: 'Align Right' },
    { icon: List, label: 'Bullet List' },
    { icon: ListOrdered, label: 'Numbered List' },
    { icon: Quote, label: 'Quote' },
    { icon: Code, label: 'Code Block' },
  ];

  return (
    <div className="border-b border-gray-200 px-6 py-3 bg-white">
      <div className="flex items-center space-x-1">
        {toolbarButtons.map((button, index) => (
          <React.Fragment key={button.label}>
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors group relative"
              title={button.shortcut ? `${button.label} (${button.shortcut})` : button.label}
            >
              <button.icon className="w-4 h-4" />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {button.label}
                {button.shortcut && (
                  <span className="ml-1 text-gray-300">({button.shortcut})</span>
                )}
              </div>
            </button>
            
            {/* Separator after formatting tools */}
            {(index === 2 || index === 5) && (
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default EditorToolbar;