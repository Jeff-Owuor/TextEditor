import { useState } from 'react';
import './App.css';
import BlogEditor from './BlogEditor';

function App() {
  const [darkMode,setDarkMode] = useState(false)
  const handleToggleMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        <button onClick={handleToggleMode}><i className="fas fa-adjust fa-2x modeButton"></i></button>
         <BlogEditor/>
    </div>
  );
}

export default App;
