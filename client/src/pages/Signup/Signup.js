import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import SignupForm from './SignupForm';

import {
  signup,
  selectIsAuth,
  selectSignupError,
} from '../../store/slices/authSlice';

function Signup() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const error = useSelector(selectSignupError);

  const handleSubmit = (data) => {
    dispatch(
      signup({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );
  };

  if (isAuth) return <Redirect to='/home' />;

  return (
    <AuthLayout header='Sign up' error={error}>
      <SignupForm onSubmit={handleSubmit} />
    </AuthLayout>
  );
}

export default Signup;