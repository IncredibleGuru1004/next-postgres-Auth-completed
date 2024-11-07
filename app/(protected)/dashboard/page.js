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
import { apiAuth } from "@/lib/authapi";

const Page = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const [editingUser, setEditingUser] = useState(null);

  useAuth();
  useEffect(() => {
    console.log('==========================')
    const fetchUsers = async () => {
      const data = await apiAuth(`/api/users/`, 'get')
      dispatch(setUsers(data))
    };

    fetchUsers();
  }, [])

  const handleSaveUser = async ({ name, email, role }) => {

    if (editingUser) {
      const data = await apiAuth(`/api/users?id=${editingUser.id}`, "put", { name, email, role })
      dispatch(updateUser(data))
      setEditingUser(null)
    } else {
      const data = await apiAuth('/api/users', 'post', { name, email, role, password: "1234567890" })
      dispatch(addUser(data))
    }
  };

  const handleEditUser = async (user) => {
    setEditingUser(user);
  };

  const handleDeleteUser = async (id) => {
    await apiAuth(`/api/users?id=${id}`, 'delete')
    dispatch(deleteUser({ id }));
  };
  const handleLogout = async () => {
    localStorage.removeItem("token")
    await signOut({ callbackUrl: '/login' })
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
