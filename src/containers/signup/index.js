import React,{useState} from 'react'
import { Layout } from '../../components/layout'
import { Navbar, Container, Nav, Row, Col, button, form } from 'react-bootstrap'
import { Input } from '../../components/UI/Input';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/user.action';

/**
* @author
* @function SignUP
**/

export const SignUP = (props) => {

    const auth = useSelector(state=>state);
    const user = useSelector(state=>state);
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const userSignup = (e)=>{
        e.preventDefault();
        const user = {
            firstName,lastName,email,password
        }
        dispatch(signup(user));
    }

    if(auth.authReducer.authenticate){
        return <Redirect to = {'/'}/>
    }
    if(user.userReducer.loading){
        return <p>Loading.......</p>
    }

    return (
        <Layout>
            <Container>
                {
                    user.userReducer.message
                }
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) =>setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) =>setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}