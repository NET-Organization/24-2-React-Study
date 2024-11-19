import React from 'react';

function ItemsPerPage({ itemsPerPage, setItemsPerPage, darkTheme }) {
  const handleChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  return (
    <div
      style={{
        color: darkTheme ? '#fff' : '#000',
        marginLeft: '10px',
      }}
    >
      <label htmlFor="itemsPerPage">Items per page:</label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={handleChange}
        style={{
          backgroundColor: darkTheme ? '#333' : '#fff',
          color: darkTheme ? '#fff' : '#000',
        }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
    </div>
  );
}

export default ItemsPerPage;
