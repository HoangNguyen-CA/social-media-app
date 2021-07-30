import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Label from '../components/form/Label';
import Button from '../components/Button';

import { login } from '../store/slices/authSlice';

function Login() {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const onSubmit = (data) => {
    dispatch(login(data.email, data.password));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isAuth && <Redirect to='/home' />}
      <Label>
        Email:
        <Input {...register('email')}></Input>
      </Label>
      <Label>
        Password:
        <Input type='password' {...register('password')}></Input>
      </Label>
      <Button submit>Submit</Button>
    </Form>
  );
}

export default Login;
