import React from 'react'
import { Layout } from '../../components/layout'
import { Navbar, Container, Nav, Row, Col, button, form } from 'react-bootstrap'
import { Input } from '../../components/UI/Input'
/**
* @author
* @function SignIn
**/

export const SignIn = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <form>
                            <Input
                                label="Email"
                                placeholder="Email"
                                type="email"
                                value=''
                                onChange={() => { }}
                            />
                            <Input
                                label="Password"
                                placeholder="Password"
                                type="password"
                                value=''
                                onChange={() => { }}
                            />
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}