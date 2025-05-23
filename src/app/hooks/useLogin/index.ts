'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export function useLogin() {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5008/auth/login', { email, password });
      toast.success('Login realizado com sucesso!');
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        'Erro ao fazer login. Verifique suas credenciais.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}