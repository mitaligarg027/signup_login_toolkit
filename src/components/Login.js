import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, signUpUser } from '../redux/slices/userSlice';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const localState = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    }
    const onSubmit = async (values) => {
        let loginCredentials = { email, password };
        const result = await dispatch(loginUser(loginCredentials))
        if (result.payload.status === 'true') {

            setEmail('')
            setPassword('')
            navigate('/demo')
        }



    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Format').required('Required'),
        password: Yup.string().password('Invalid Password').required('Required')
    })
    return (
        <>
            <h1>SignUp</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                <Form>

                    <div className="form-control">
                        <label htmlFor='email'>Email</label>
                        <Field type="text" id='name' name='name' />
                        <ErrorMessage name='email' >
                            {errorMsg => <div className='error'>{errorMsg}</div>}
                        </ErrorMessage>
                    </div>
                    <div className="form-control">
                        <label htmlFor='password'>Password</label>
                        <Field type="text" id='password' name='password' />
                        <ErrorMessage name='password' >
                            {errorMsg => <div className='error'>{errorMsg}</div>}
                        </ErrorMessage>
                    </div>
                </Form>
            </Formik>


        </>
    )
}

export default Login;
