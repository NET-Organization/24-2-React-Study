import React from 'react';
import titleImage from '../Resources/title.png'

function Image() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <img
        src={titleImage}
        alt="Pokémon Logo"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}

export default Image;
