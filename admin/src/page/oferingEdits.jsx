import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOffering = () => {
  const [offerings, setOfferings] = useState([]);

  useEffect(() => {
    axios.get('/api/offerings').then(res => setOfferings(res.data));
  }, []);

  const handleUpdate = () => {
    axios.post('/api/offerings/update', { offerings })
      .then(() => alert("Data Updated Successfully!"));
  };

  const updateItem = (catIdx, itemIdx, field, lang, value) => {
    const newOfferings = [...offerings];
    if(lang) {
        newOfferings[catIdx].items[itemIdx][field][lang] = value;
    } else {
        newOfferings[catIdx].items[itemIdx][field] = value;
    }
    setOfferings(newOfferings);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-5">Admin - Manage Offerings</h2>
      
      {offerings.map((cat, catIdx) => (
        <div key={catIdx} className="mb-8 p-5 bg-white rounded shadow">
          <h3 className="text-xl font-bold text-orange-600">{cat.categoryTitle.ml} ({cat.categoryTitle.en})</h3>
          
          {cat.items.map((item, itemIdx) => (
            <div key={itemIdx} className="grid grid-cols-3 gap-4 mt-3 border-b pb-2">
              <input 
                value={item.name.ml} 
                onChange={(e) => updateItem(catIdx, itemIdx, 'name', 'ml', e.target.value)}
                placeholder="Malayalam Name" className="border p-1"
              />
              <input 
                value={item.name.en} 
                onChange={(e) => updateItem(catIdx, itemIdx, 'name', 'en', e.target.value)}
                placeholder="English Name" className="border p-1"
              />
              <input 
                type="number" value={item.price} 
                onChange={(e) => updateItem(catIdx, itemIdx, 'price', null, e.target.value)}
                placeholder="Price" className="border p-1"
              />
            </div>
          ))}
        </div>
      ))}
      
      <button onClick={handleUpdate} className="bg-green-600 text-white px-6 py-2 rounded">
        Save All Changes
      </button>
    </div>
  );
};

export default AdminOffering;
