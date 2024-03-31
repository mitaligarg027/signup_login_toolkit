import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../redux/slices/userSlice';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Signup = () => {
    const [Name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const localState = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: ''
    }
    const onSubmit = async (values) => {
        let signUpCredentials = { Name, email, password };
        const result = await dispatch(signUpUser(signUpCredentials))
        if (result.payload.status === 'true') {
            // console.log("if",result.payload)
            setName('')
            setEmail('')
            setPassword('')
            navigate('/login')
        }



    }
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
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
                        <label htmlFor='name'>Name</label>
                        <Field type="text" id='name' name='name' />
                        <ErrorMessage name='name' >
                            {errorMsg => <div className='error'>{errorMsg}</div>}
                        </ErrorMessage>
                    </div>
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

export default Signup
