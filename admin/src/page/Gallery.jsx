import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const Gallery = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosInstance.get("/gallery")
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-800 mb-6">
        Gallery
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white shadow rounded-lg p-4">
            {item.type === "image" ? (
              <img src={item.url} className="w-full h-40 object-cover rounded" />
            ) : (
              <video src={item.url} controls className="w-full h-40 rounded" />
            )}

            <p className="text-sm text-gray-600 mt-2">
              Uploaded: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;