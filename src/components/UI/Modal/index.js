import React, {useState} from 'react'
import { Navbar, Container, Nav, Row, Col, Button, form, Modal } from 'react-bootstrap'

/**
* @author
* @function Modal
**/

export const NewModal = (props) => {

  return (
    <div>
      <Modal size = {props.size} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="Primary" onClick={props.handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )

}