import React from 'react'
import { Layout } from '../../components/layout'
import { Navbar, Container, Nav, Row, Col, button, form } from 'react-bootstrap'
import { Input } from '../../components/UI/Input'
/**
* @author
* @function SignUP
**/

export const SignUP = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <form>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        type="text"
                                        value=''
                                        onChange={() => { }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        type="text"
                                        value=''
                                        onChange={() => { }}
                                    />
                                </Col>
                            </Row>
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