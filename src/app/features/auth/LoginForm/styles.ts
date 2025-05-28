'use client';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/images/people.jpg");
  cover: no-repeat center center fixed;
  background-size: cover;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 320px;
  padding: 32px;
  background-color:rgb(15, 15, 15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }
`;

export const Input = styled.input`
  padding: 12px;
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  color: white;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    border-bottom: 1px solid #0070f3;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #005fd1;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const SwitchButton = styled.button`
  background: none;
  border: none;
  color: #0070f3;
  cursor: pointer;
  font-size: 14px;
  margin-top: 12px;
  transition: color 0.2s ease;

  &:hover {
    color: #005fd1;
    text-decoration: underline;
  }
`;
