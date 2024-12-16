import React, { useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    alert(`Theme changed to ${e.target.value}`);
  };

  return (
    <div>
      <h1>Settings</h1>
      <label htmlFor="theme-select">Select Theme:</label>
      <select id="theme-select" value={theme} onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default Settings;
