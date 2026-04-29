import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FaEdit, FaPlus, FaSave, FaTimes, FaTrash } from "react-icons/fa";

const createEmptyItem = () => ({ name_ml: "", name_en: "", price: "" });

const createEmptyGroup = () => ({
  title: { ml: "", en: "" },
  image: "",
  small: false,
  items: [createEmptyItem()],
});

const sanitizePriceInput = (value) => {
  const cleaned = String(value).replace(/[^\d.]/g, "");
  const firstDotIndex = cleaned.indexOf(".");

  if (firstDotIndex === -1) {
    return cleaned;
  }

  const beforeDot = cleaned.slice(0, firstDotIndex + 1);
  const afterDot = cleaned.slice(firstDotIndex + 1).replace(/\./g, "");
  return `${beforeDot}${afterDot}`;
};

const normalizeGroup = (group) => ({
  _id: group?._id,
  title: {
    ml: group?.title?.ml || "",
    en: group?.title?.en || "",
  },
  image: group?.image || "",
  small: Boolean(group?.small),
  items:
    Array.isArray(group?.items) && group.items.length > 0
      ? group.items.map((item) => ({
          name_ml: item?.name_ml || "",
          name_en: item?.name_en || "",
          price: item?.price ?? "",
        }))
      : [createEmptyItem()],
});

const validateGroup = (group) => {
  if (!group.title.ml.trim()) return "Malayalam title is required.";
  if (!group.title.en.trim()) return "English title is required.";
  if (!Array.isArray(group.items) || group.items.length === 0) {
    return "Add at least one item.";
  }

  for (let i = 0; i < group.items.length; i += 1) {
    const item = group.items[i];
    const normalizedPrice = String(item.price ?? "").trim();

    if (!item.name_ml.trim())
      return `Item ${i + 1}: Malayalam name is required.`;
    if (!item.name_en.trim()) return `Item ${i + 1}: English name is required.`;
    if (!normalizedPrice) {
      return `Item ${i + 1}: Price is required.`;
    }

    const price = Number(normalizedPrice);
    if (Number.isNaN(price) || price < 0) {
      return `Item ${i + 1}: Enter a valid price.`;
    }
  }

  return "";
};

const preparePayload = (group) => ({
  title: {
    ml: group.title.ml.trim(),
    en: group.title.en.trim(),
  },
  image: group.image.trim(),
  small: Boolean(group.small),
  items: group.items.map((item) => ({
    name_ml: item.name_ml.trim(),
    name_en: item.name_en.trim(),
    price: Number(String(item.price).trim()),
  })),
});

export const EditOffering = () => {
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const fetchOfferings = async () => {
    try {
      const res = await axiosInstance.get("/offering");
      setOfferings(Array.isArray(res.data) ? res.data.map(normalizeGroup) : []);
    } catch (err) {
      console.error("Error fetching offerings", err);
      setOfferings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfferings();
  }, []);

  const openCreateModal = () => {
    setEditingGroup(createEmptyGroup());
    setIsModalOpen(true);
  };

  const openEditModal = (group) => {
    setEditingGroup(normalizeGroup(group));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving || imageUploading) return;
    setIsModalOpen(false);
    setEditingGroup(null);
  };

  const updateTitle = (field, value) => {
    setEditingGroup((prev) => ({
      ...prev,
      title: {
        ...prev.title,
        [field]: value,
      },
    }));
  };

  const updateItem = (index, field, value) => {
    setEditingGroup((prev) => ({
      ...prev,
      items: prev.items.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addItem = () => {
    setEditingGroup((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyItem()],
    }));
  };

  const removeItem = (index) => {
    setEditingGroup((prev) => {
      const nextItems = prev.items.filter((_, idx) => idx !== index);
      return {
        ...prev,
        items: nextItems.length > 0 ? nextItems : [createEmptyItem()],
      };
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setImageUploading(true);
    try {
      const res = await axiosInstance.post("/offering/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data?.url;
      if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }

      setEditingGroup((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.error("Offering image upload failed", error);
      alert(error?.response?.data?.message || "Image upload failed.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editingGroup) return;
    if (imageUploading) {
      alert("Please wait for image upload to finish.");
      return;
    }

    const validationError = validateGroup(editingGroup);
    if (validationError) {
      alert(validationError);
      return;
    }

    setSaving(true);

    try {
      const payload = preparePayload(editingGroup);

      if (editingGroup._id) {
        await axiosInstance.put(`/offering/${editingGroup._id}`, payload);
      } else {
        await axiosInstance.post("/offering", payload);
      }

      await fetchOfferings();
      setIsModalOpen(false);
      setEditingGroup(null);
    } catch (err) {
      console.error("Save failed", err);
      alert(err?.response?.data?.message || "Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGroup = async (id) => {
    if (!id) return;

    const confirmed = window.confirm("Delete this offering category?");
    if (!confirmed) return;

    setDeletingId(id);

    try {
      await axiosInstance.delete(`/offering/${id}`);
      await fetchOfferings();
    } catch (err) {
      console.error("Delete failed", err);
      alert(err?.response?.data?.message || "Delete failed. Please try again.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-amber-900">
              വഴിപാടു വിവരങ്ങൾ
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Create, edit, and delete categories and offering items.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 font-bold"
          >
            <FaPlus /> Add Category
          </button>
        </div>

        {offerings.length === 0 ? (
          <div className="text-center p-20 bg-white rounded-xl border-2 border-dashed border-amber-200 text-gray-500">
            No offering data yet. Click "Add Category" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((group) => (
              <div
                key={group._id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100"
              >
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-amber-900">
                      {group.title.ml}
                    </h2>
                    <p className="text-xs text-stone-500">{group.title.en}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(group)}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group._id)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 disabled:opacity-60"
                      disabled={deletingId === group._id}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-64 overflow-auto pr-1">
                  {group.items.map((item, index) => (
                    <div
                      key={`${group._id}-${index}`}
                      className="border-b pb-1 text-sm"
                    >
                      <div className="flex justify-between items-center text-stone-700">
                        <span>{item.name_ml}</span>
                        <span className="font-semibold text-blue-700">
                          Rs {item.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400">
                        {item.name_en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && editingGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-bold text-stone-800">
                {editingGroup._id ? "Edit Category" : "Create Category"}
              </h3>
              <button
                onClick={closeModal}
                className="text-stone-500 hover:text-stone-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold mb-1">
                  Category Name (Malayalam)
                </label>
                <input
                  className="w-full border rounded p-2"
                  value={editingGroup.title.ml}
                  onChange={(e) => updateTitle("ml", e.target.value)}
                  placeholder="e.g. Bhagavathy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  Category Name (English)
                </label>
                <input
                  className="w-full border rounded p-2"
                  value={editingGroup.title.en}
                  onChange={(e) => updateTitle("en", e.target.value)}
                  placeholder="e.g. Bhagavathy"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold mb-1">
                  Image URL
                </label>
                <input
                  className="w-full border rounded p-2"
                  value={editingGroup.image}
                  onChange={(e) =>
                    setEditingGroup((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  placeholder="/Bhagawathy.jpg or https://..."
                />
                <div className="mt-2 flex flex-col gap-2">
                  <label className="text-xs font-bold">Upload New Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full rounded border border-dashed border-amber-300 p-2 text-xs"
                    disabled={imageUploading}
                  />
                  {imageUploading ? (
                    <p className="text-xs text-amber-700 font-semibold">
                      Uploading image...
                    </p>
                  ) : null}
                  {editingGroup.image ? (
                    <img
                      src={editingGroup.image}
                      alt="Offering preview"
                      className="mt-1 h-20 w-20 rounded object-cover border"
                    />
                  ) : null}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-stone-700 md:col-span-2">
                <input
                  type="checkbox"
                  checked={editingGroup.small}
                  onChange={(e) =>
                    setEditingGroup((prev) => ({
                      ...prev,
                      small: e.target.checked,
                    }))
                  }
                />
                Mark as small card
              </label>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-bold">Offering Items</h4>
                <button
                  onClick={addItem}
                  className="text-blue-600 text-sm font-bold flex items-center gap-1"
                >
                  <FaPlus /> Add Item
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-auto pr-1">
                {editingGroup.items.map((item, idx) => (
                  <div
                    key={`edit-item-${idx}`}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_40px] gap-2 items-center"
                  >
                    <input
                      placeholder="Malayalam name"
                      className="border rounded p-2 text-sm"
                      value={item.name_ml}
                      onChange={(e) =>
                        updateItem(idx, "name_ml", e.target.value)
                      }
                    />
                    <input
                      placeholder="English name"
                      className="border rounded p-2 text-sm"
                      value={item.name_en}
                      onChange={(e) =>
                        updateItem(idx, "name_en", e.target.value)
                      }
                    />
                    <input
                      placeholder="Price"
                      className="border rounded p-2 text-sm"
                      type="text"
                      inputMode="decimal"
                      pattern="[0-9]*[.]?[0-9]*"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(
                          idx,
                          "price",
                          sanitizePriceInput(e.target.value),
                        )
                      }
                    />
                    <button
                      onClick={() => removeItem(idx)}
                      className="text-red-500 hover:text-red-700 flex items-center justify-center"
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100"
                disabled={saving || imageUploading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || imageUploading}
                className="px-5 py-2 rounded-lg bg-amber-700 text-white font-bold hover:bg-amber-800 disabled:opacity-60 flex items-center gap-2"
              >
                <FaSave />{" "}
                {imageUploading
                  ? "Uploading image..."
                  : saving
                    ? "Saving..."
                    : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditOffering;
