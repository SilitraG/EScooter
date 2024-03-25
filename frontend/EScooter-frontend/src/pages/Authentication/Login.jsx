import { Button, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const initialValues={username:"", password:""};
const validationSchema={
    username:Yup.string()
                .required("Username is required"),
    password:Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
};
const Login = () => {
    const [formValue, setFormValue] = useState();
    const dispatch=useDispatch();

    const handleSubmit = (values) => {
        console.log("handle submit", values);
        dispatch(loginUserAction({data:values}))
    };


  return (
    <>
    <Formik 
        onSubmit={handleSubmit} 
       // validationSchema={validationSchema} 
        initialValues={initialValues}    
    >
        <Form className="space-y-5">
            <div className='space-y-5'>
                <div>
                    <Field 
                        as={TextField}
                        name="username" 
                        placeholder="Username" 
                        type="text"
                        fullWidth
                    />
                    <ErrorMessage 
                        name="email" 
                        component={"div"} 
                        className="text-red-500"
                    />
                </div>
                <div>
                    <Field 
                        as={TextField}
                        name="password" 
                        placeholder="Password" 
                        type="password" 
                        fullWidth
                    />
                    <ErrorMessage 
                        name="password" 
                        component="div" 
                        className="text-red-500"
                    />
                </div>
            </div>
            <Button
                sx={{ padding: ".8rem 0rem" }} 
                fullWidth 
                type="submit" 
                variant="contained" 
                color="primary"
            >
                Login
            </Button>

        </Form>
    </Formik>
    <div className="flex gap-2 items-center justify-center pt-5">
        <p>You don't have account?</p>
        <Link to="/register">Register</Link>
    </div>
    </>
  );
};

export default Login