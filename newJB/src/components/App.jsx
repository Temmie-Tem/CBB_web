import React from 'react';
import Header from './Header';
import PostViewPage from './PostViewPage.jsx';
import Footer from './Footer'; 
import '../css/App.css';

function App() {

  return (
    <div className="App">
      <Header />
      <main className="main_content">
      <PostViewPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
