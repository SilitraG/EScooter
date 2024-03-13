import { Button, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { registerUserAction } from '../../Redux/Auth/auth.action';

const initialValues={name:"", email:"", username:"", password:"", role:"USER", dob:""};
const validationSchema={
    email:Yup.string()
             .email("Invalid email")
             .required("Email is required"),
    password:Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
};
const Register = () => {
    const [role, setRole] = useState("USER");
    const dispatch=useDispatch();

    const handleSubmit = (values) => {
        values.role=role;
        console.log("handle submit", values);
        dispatch(registerUserAction({data:values}))
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
                        name="name" 
                        placeholder="Name" 
                        type="text" 
                        variant="outlined"
                        fullWidth
                    />
                    <ErrorMessage 
                        name="name" 
                        component={"div"} 
                        className="text-red-500"
                    />
                </div>
                <div>
                    <Field 
                        as={TextField}
                        name="email" 
                        placeholder="Email" 
                        type="email" 
                        variant="outlined"
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
                        name="username" 
                        placeholder="Username" 
                        type="text"
                        variant="outlined"
                        fullWidth
                    />
                    <ErrorMessage 
                        name="username" 
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
                        variant="outlined"
                        fullWidth
                    />
                    <ErrorMessage 
                        name="password" 
                        component="div" 
                        className="text-red-500"
                    />
                </div>
                <div>
                    <Field 
                        as={TextField}
                        name="dob" 
                        placeholder="Date of Birth" 
                        type="date"
                        fullWidth
                    />
                    <ErrorMessage 
                        name="dob" 
                        component={"div"} 
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
                Register
            </Button>
        </Form>
    </Formik>
    </>
  );
};

export default Register