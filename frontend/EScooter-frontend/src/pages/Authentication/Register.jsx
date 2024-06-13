import { Button, TextField, Grid } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { registerUserAction } from '../../Redux/Auth/auth.action';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const initialValues = { name: "", email: "", username: "", password: "", role: "USER", dob: "" };
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const Register = () => {
    const [role, setRole] = useState("USER");
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (values) => {
        values.role = role;
        console.log("handle submit", values);

        dispatch(registerUserAction({ data: values }))

        history.push('/login');
    };

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}
            >
                <Form className="space-y-5">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{ padding: ".8rem 0rem" }}
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            <Grid container justifyContent="center" alignItems="center" style={{ paddingTop: '1rem' }}>
                <Grid item xs={12} sm={8} md={6} lg={6}>
                    <div className="flex flex-col items-center space-y-2">
                        <p>You already have an account?</p>
                        <Link to="/login" style={{ width: '100%' }}>
                            <Button
                                sx={{ padding: ".8rem 0rem" }}
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default Register;
