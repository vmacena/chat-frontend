'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export function useRegister() {
  const [loading, setLoading] = useState(false);

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5008/auth/register', {
        name,
        email,
        password,
      });
      toast.success('Registro realizado com sucesso!');
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        'Erro ao realizar registro. Tente novamente.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}