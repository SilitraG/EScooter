import { Box, Button, TextField, Grid, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';

const initialValues = { username: "", password: "" };
const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (values, { setSubmitting }) => {
        console.log("handle submit", values);
        dispatch(loginUserAction({ data: values })).then(() => {
            history.push('/home', { userName: values.username });
        });
    };

    return (
        <>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={11} sm={8} md={5} lg={6}>
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
                                        name="username"
                                        placeholder="Username"
                                        type="text"
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
                                        fullWidth
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
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
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                    <Box
                        sx={{ mt: 1, textAlign: 'center' }}
                    >
                        <Typography>
                            You don't have an account?
                        </Typography>
                        <Link to="/register">
                            <Button
                                sx={{ padding: ".8rem 0rem", mt: 1 }}
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;
