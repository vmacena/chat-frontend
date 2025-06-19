'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5008/auth/login', { email, password });
      const token = response.data.token;

      if (!token || token.split('.').length !== 3) {
        throw new Error('Token inválido ou mal formatado.');
      }

      localStorage.setItem('token', token);
      toast.success('Login realizado com sucesso!');
      router.push('/pages/chat');
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Erro ao fazer login. Verifique suas credenciais.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
