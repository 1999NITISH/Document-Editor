# 🚀 Real-time Collaborative Document Editor

### 🔄 Real-time Collaboration
- **Live editing** - See changes from other users instantly
- **User presence** - View who's currently editing the document
- **Typing indicators** - Know when others are typing
- **User avatars** - Colorful avatars for each collaborator
- **Connection status** - Real-time connection monitoring

### 📝 Rich Text Editing
- **WYSIWYG editor** powered by Quill.js
- **Text formatting** - Bold, italic, underline, strikethrough
- **Headers** - Multiple heading levels (H1-H6)
- **Lists** - Ordered and unordered lists with indentation
- **Colors** - Text and background color customization
- **Alignment** - Left, center, right, and justify alignment
- **Media support** - Insert links, images, and videos

### 💾 Document Management
- **Auto-save** - Documents save automatically as you type
- **Manual save** - Save button for explicit saves
- **Export documents** - Download as HTML files
- **Import documents** - Upload HTML or text files
- **Document titles** - Editable document names
- **Last saved timestamp** - Track when documents were last saved

### 👥 User Experience
- **Responsive design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface
- **Character count** - Real-time character counting
- **Connection indicators** - Visual feedback for network status
- **Smooth animations** - Polished micro-interactions

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Socket.IO Client** - Real-time communication
- **React Quill** - Rich text editor component
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with flexbox and grid

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd collaborative-document-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm run server
   ```
   The server will start on `http://localhost:3001`

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

5. **Open multiple browser tabs** to test real-time collaboration!

## 📁 Project Structure

```
collaborative-document-editor/
├── src/
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   ├── main.tsx             # React entry point
│   └── vite-env.d.ts        # Vite type definitions
├── server/
│   └── index.js             # Socket.IO server
├── public/
│   └── vite.svg             # App icon
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SERVER_URL=http://localhost:3001
PORT=3001
```

### Server Configuration
The server runs on port 3001 by default. To change:

```javascript
// server/index.js
const PORT = process.env.PORT || 3001;
```

### Client Configuration
Update the server URL in the client:

```typescript
// src/App.tsx
const newSocket = io('http://localhost:3001');
```

## 🎯 Usage Guide

### Basic Editing
1. **Start typing** in the editor to create content
2. **Use the toolbar** for text formatting options
3. **Change the title** by clicking on "Untitled Document"

### Collaboration
1. **Share the URL** with other users
2. **See live cursors** and typing indicators
3. **View connected users** in the top-right corner

### Document Management
1. **Save manually** using the save button (💾)
2. **Export documents** using the download button (⬇️)
3. **Import files** using the upload button (⬆️)

## 🔌 API Reference

### Socket Events

#### Client to Server
- `join-document` - Join a document room
- `content-change` - Send content updates
- `title-change` - Update document title
- `save-document` - Save document manually
- `user-typing` - Indicate user is typing
- `user-stopped-typing` - Indicate user stopped typing

#### Server to Client
- `document-data` - Receive document content
- `content-change` - Receive content updates
- `title-change` - Receive title updates
- `users-update` - Receive updated user list
- `user-typing` - User started typing
- `user-stopped-typing` - User stopped typing
- `document-saved` - Document save confirmation

## 🎨 Customization

### Styling
Modify `src/App.css` to customize the appearance:

```css
/* Change primary color */
:root {
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
}

/* Customize editor */
.editor .ql-editor {
  font-family: 'Your Font', sans-serif;
  font-size: 18px;
  line-height: 1.8;
}
```

### Editor Configuration
Customize the Quill editor toolbar:

```typescript
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image']
  ],
};
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

### Backend Deployment (Heroku/Railway)
1. **Create a `Procfile`**
   ```
   web: node server/index.js
   ```

2. **Set environment variables**
   ```
   PORT=3001
   ```

3. **Deploy to your platform**

### Full-Stack Deployment
Consider using platforms like:
- **Railway** - Full-stack deployment
- **Render** - Web services and static sites
- **DigitalOcean App Platform** - Container-based deployment

## 🧪 Testing

### Manual Testing
1. **Open multiple browser tabs**
2. **Type in one tab** and verify changes appear in others
3. **Test different formatting options**
4. **Verify save/export functionality**

### Automated Testing (Future Enhancement)
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test
```

## 🔒 Security Considerations

### Current Implementation
- Basic CORS configuration
- In-memory data storage
- No authentication system

### Production Recommendations
- Implement user authentication
- Add rate limiting
- Use persistent database storage
- Add input sanitization
- Implement document permissions
- Add SSL/TLS encryption

## 🐛 Troubleshooting

### Common Issues

**Connection Failed**
- Ensure the server is running on port 3001
- Check firewall settings
- Verify CORS configuration

**Editor Not Loading**
- Check browser console for errors
- Ensure Quill CSS is loaded
- Verify React Quill installation

**Real-time Updates Not Working**
- Check Socket.IO connection
- Verify server logs
- Test with multiple browser tabs

### Debug Mode
Enable debug logging:

```javascript
// Client-side debugging
localStorage.debug = 'socket.io-client:socket';

// Server-side debugging
DEBUG=socket.io:* node server/index.js
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Use TypeScript for type safety
- Follow React best practices
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Quill.js** - Powerful rich text editor
- **Socket.IO** - Real-time communication
- **React Team** - Amazing frontend framework
- **Vite Team** - Lightning-fast build tool
- **Lucide** - Beautiful icon library

## 📞 Support

Need help? Here are your options:

- **GitHub Issues** - Report bugs or request features
- **Documentation** - Check this README for guidance
- **Community** - Join our discussions

## 🔮 Future Enhancements

### Planned Features
- [ ] **User authentication** - Login/signup system
- [ ] **Document permissions** - Share controls
- [ ] **Version history** - Track document changes
- [ ] **Comments system** - Add inline comments
- [ ] **Offline support** - Work without internet
- [ ] **Mobile app** - Native mobile experience
- [ ] **Advanced formatting** - Tables, code blocks
- [ ] **Plugin system** - Extensible architecture

### Technical Improvements
- [ ] **Database integration** - PostgreSQL/MongoDB
- [ ] **Redis caching** - Improved performance
- [ ] **Load balancing** - Handle more users
- [ ] **CDN integration** - Faster asset delivery
- [ ] **Monitoring** - Application analytics
- [ ] **Testing suite** - Automated testing
- [ ] **CI/CD pipeline** - Automated deployment

