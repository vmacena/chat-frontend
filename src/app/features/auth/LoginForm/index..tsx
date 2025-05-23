'use client';

import { useState } from 'react';
import { useLogin } from '@/app/hooks/useLogin';
import { useRegister } from '@/app/hooks/useRegister';
import * as S from './styles';

export function LoginForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { login, loading: loginLoading } = useLogin();
  const { register, loading: registerLoading } = useRegister();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      await login(email, password);
    } else {
      await register(name, email, password);
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <img
          src="/images/conecta.png"
          alt="Logo"
          style={{
            display: 'block',
            margin: '0 auto 24px auto',
            width: 100,
            height: 64,
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        {mode === 'register' && (
          <S.Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}
        <S.Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <S.Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <S.Button type="submit" disabled={loginLoading || registerLoading}>
          {mode === 'login'
            ? loginLoading ? 'Entrando...' : 'Entrar'
            : registerLoading ? 'Registrando...' : 'Registrar'}
        </S.Button>
        <S.SwitchButton type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Criar conta' : 'Já tenho conta'}
        </S.SwitchButton>
      </S.Form>
    </S.Container>
  );
}