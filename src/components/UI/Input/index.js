import React from 'react'
import { Navbar, Container, Nav, Row, Col, button, form } from 'react-bootstrap'
import '../../../../src/App.css'
/**
* @author
* @function Input
**/

export const Input = (props) => {
    return (
        <div>
            <div class="form-group" >
                <label for="exampleInputEmail1">{props.label}</label>
                <input 
                    type={props.type}
                    label={props.label}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder} />
            </div>
        </div>
    )

}