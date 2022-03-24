import React, {useEffect, useState} from 'react'
import { Layout } from '../../components/layout'
import { Navbar, Container, Nav, Row, Col, button, form } from 'react-bootstrap'
import { Input } from '../../components/UI/Input';
import { login } from './../../actions'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
/**
* @author
* @function SignIn
**/

export const SignIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const auth = useSelector(state=>state);

    const dispatch = useDispatch();
//ddd@gmail.com
    const userLogin = (e)=>{
        e.preventDefault();

        const user = {
            email,
            password
        }
        dispatch(login(user));
    }

    if(auth.authReducer.authenticate){
        console.log('>>> inside if');
        return <Redirect to = {'/'}/>
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <form onSubmit={userLogin}>
                            <Input
                                label="Email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value) }}
                            />
                            <Input
                                label="Password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value)}}
                            />
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}