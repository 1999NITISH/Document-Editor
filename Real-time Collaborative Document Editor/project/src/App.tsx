import React from 'react';
import DocumentEditor from './components/DocumentEditor';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DocumentEditor />
      </main>
    </div>
  );
}

export default App;