import React from 'react';
import useGetToken from '../../hooks/useGetToken';

export default function AuthenticationPage() {
  useGetToken();

  return <div>AuthenticationPage</div>;
}
