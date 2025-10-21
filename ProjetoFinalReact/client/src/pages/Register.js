import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    role:"",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(6).max(30).required(),
    password: Yup.string().min(8).max(30).required(),
    role: Yup.string().oneOf(['User', 'Psicologo']).required(),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/register", data);
      console.log(response.data); 
      navigate("/"); 
    } catch (error) {
      console.error("Erro ao registar:", error);
    }
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label>Username:</label>
          <ErrorMessage name="username" component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="(Ex. John123... )" />

          <label>Password:</label>
          <ErrorMessage name="password" component="span" />
          <Field autoComplete="off" type="password" id="inputCreatePost" name="password" placeholder="(Ex. 123456...)" />

          <label>Role:</label>
          <ErrorMessage name="role" component="span" />
          <Field as="select" id="inputCreatePost" name="role">
            <option value="">Seleciona uma role</option>
            <option value="User">User</option>
            <option value="Psicologo">Psicólogo</option>
            
          </Field>

          <button type="submit">Registar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;