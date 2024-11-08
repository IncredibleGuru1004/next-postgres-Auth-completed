import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = (Child) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); // Redirect if no token
      }
    }, [router]);
    return <Child {...props}/>;
  }
};

export default useAuth;
