import { useState } from "react";
import { db } from "../pages/firebase"; // Import Firebase config
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const BookTablePopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    partySize: "",
    date: "",
    time: "",
    specialRequests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Reference to Firestore collection
      const bookingsRef = collection(db, "bookings");

      // Save form data to Firestore
      await addDoc(bookingsRef, { ...formData, createdAt: new Date() });

      // SweetAlert Success Popup
      Swal.fire({
        title: "Success!",
        text: "Table booked successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      // Reset Form and Close Popup
      setFormData({
        name: "",
        email: "",
        phone: "",
        partySize: "",
        date: "",
        time: "",
        specialRequests: "",
      });
      onClose();
    } catch (error) {
      console.error("Error booking table:", error);

      // SweetAlert Error Popup
      Swal.fire({
        title: "Error!",
        text: "Failed to book table. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="book-a-table fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Book a Table
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Form Rows */}
          <div className="flex flex-wrap -mx-2">
            {/* Row 1 */}
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-200 border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Row 2 */}
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700 mb-1">Party Size</label>
              <input
                type="number"
                name="partySize"
                value={formData.partySize}
                onChange={handleChange}
                required
                className="w-full bg-gray-200 border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Row 3 */}
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label className="block text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full bg-gray-200 border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Row 4 (Full Width) */}
            <div className="w-full px-2 mb-4">
              <label className="block text-gray-700 mb-1">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className="w-full bg-gray-100 border-gray-300 rounded px-3 py-2"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookTablePopup;
