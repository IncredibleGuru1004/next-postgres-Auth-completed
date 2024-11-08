// UserForm.js
import { useState, useEffect } from "react";

const UserForm = ({ onSave, user }) => {
  const [formFields, setFormFields] = useState({ name: "", email: "", role: "Guest" });
  const [errors, setErrors] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user) {
      setFormFields({ name: user.name, email: user.email, role: user.role });
    } else {
      setFormFields({ name: "", email: "", role: "Guest" });
    }
  }, [user]);

  const validateFields = () => {
    const newErrors = { name: "", email: "" };
    
    // Check if the name field is empty
    if (!formFields.name) {
      newErrors.name = "Name is required.";
    }
  
    // Check if the email field is empty
    if (!formFields.email) {
      newErrors.email = "Email is required.";
    } else {
      // Use a regex to validate basic email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formFields.email)) {
        newErrors.email = "Invalid email address.";
      }
    }
  
    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return !newErrors.name && !newErrors.email;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      onSave(formFields);
      setFormFields({ name: "", email: "", role: "Guest" });
      setErrors({ name: "", email: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 bg-white shadow-xl rounded-lg mb-4">
      <div className="mb-2">
        <label className="block mb-1 text-sm font-semibold">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={formFields.name}
          onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
          className={`border p-2 w-full rounded ${errors.name && 'border-red-500'}`}
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-2">
        <label className="block mb-1 text-sm font-semibold">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={formFields.email}
          onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
          className={`border p-2 w-full rounded ${errors.email && 'border-red-500'}`}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold">Role</label>
        <select
          value={formFields.role === "Admin" ? "Admin" : "Guest"}
          onChange={(e) => setFormFields({ ...formFields, role: e.target.value })}
          className="border p-2 w-full rounded"
          required
        >
          <option value="Admin">Admin</option>
          <option value="Guest">Guest</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
        {user ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;