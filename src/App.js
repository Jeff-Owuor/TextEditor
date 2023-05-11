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
        <div className="themeContainer">
            <i className="fas fa-adjust fa-3x modeButton" onClick={handleToggleMode}></i>
            <h1 className="header">{`${darkMode ? 'Dark' : 'Light'}`}</h1>
         </div>
         <BlogEditor/>
    </div>
  );
}

export default App;
