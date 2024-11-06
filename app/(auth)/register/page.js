'use client';

import AuthForm from "@/components/AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter()

  const handleSaveUser = async ({ name, email, password }) => {
    try {
      const response = await axios.post(`/api/auth/register`, { name, email, password });
      if (response.status === 201) {
        router.push('/login');
      }
    } catch (error) {
    }
  };


  return (
    <>
      <AuthForm mode="register" onSubmit={handleSaveUser} />
    </>
  );
}