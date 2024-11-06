'use client';

import AuthForm from "@/components/AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const loginWithSession = async () => {
      const email = session.user.email
      const name = session.user.name
      try {
        const response = await axios.post('/api/auth/login', { email, name, password: "Google" });
        if (response.status === 200) {
          router.push('/dashboard')
        }
      } catch (error) {
        if (error.status === 409) {
          router.push('/dashboard')
        }
      }
    }

    if (status === "authenticated") {
      loginWithSession()
    }
  }, [status])

  const handleLoginUser = async ({ email, password }) => {
    try {
      const response = await axios.post(`/api/auth/login`, { email, password });
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        return router.push('/dashboard');
      }
    } catch (error) {
      if (error.status == 403) {
        console.log('Error: ', error.response.data.error)
      }
    }
  };

  const handleGoogleSignIn = async () => {
    if (!session) {
      await signIn('google')
    }
  };

  return (
    <>
      <AuthForm mode="login" onSubmit={handleLoginUser} handleGoogleSignIn={handleGoogleSignIn} />
    </>
  );
}