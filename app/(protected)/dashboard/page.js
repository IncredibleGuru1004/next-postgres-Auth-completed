'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";
import { addUser, deleteUser, setUsers, updateUser } from "@/redux/slices/userSlice";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";

const Page = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const [editingUser, setEditingUser] = useState(null);

  useAuth();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/users/`);
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [])

  const handleSaveUser = async ({ name, email, role }) => {
    try {
      if (editingUser) {
        console.log({editingUser})
        const response = await axios.put(`/api/users?id=${editingUser.id}`, {name, email, role})
        const updatedUser = response.data;
        dispatch(updateUser(updatedUser));
        setEditingUser(null);
      } else {
        const response = await axios.post('/api/users', {name, email, role, password:"1234567890"});
        const newUser = response.data
        dispatch(addUser(newUser));
      }
    } catch (error) {
      console.error("Error saving User:", error);
    }
  };

  const handleEditUser = async (user) => {
    setEditingUser(user);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response  = await axios.delete(`/api/users?id=${id}`)
      dispatch(deleteUser({ id }));
    } catch (error) {

    }
  };
  const handleLogout = async () => {
    await signOut({callbackUrl:'/login'})
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <UserForm onSave={handleSaveUser} user={editingUser} />
      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default Page;
