import React from 'react';

function Button({ onToggle, darkTheme }) {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: '10px 20px',
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#000',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {darkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}

export default Button;
