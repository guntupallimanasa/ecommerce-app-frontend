import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout';
import { Navbar, Container, Nav, Row, Col, Button, form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory } from '../../actions';
import { Input } from '../../components/UI/Input';
import { NewModal } from '../../components/UI/Modal'
/**
* @author
* @function Category
**/

export const Category = (props) => {

    const [show, setShow] = useState(false);

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryImage, setParentCategoryImage] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');

    const handleClose = () => {
        const form = new FormData();

        form.append("name", categoryName);
        form.append("parentId", parentCategoryId);
        form.append("categoryImage", categoryImage);
        dispatch(addCategory(form))
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const category = useSelector(state => state);

    const renderCategories = (categories) => {
        let category = [];

        for (let cate of categories) {
            category.push(<li key={cate.name}>
                {cate.name}
                {cate.children.length > 0 ? (<ul>{renderCategories(cate.children)}</ul>) : null}
            </li>)
        }
        return category;
    }
    const createCAtegoryList = (categories, options = []) => {
        for (let cate of categories) {
            options.push({ value: cate._id, name: cate.name });
            if (cate.children.length > 0) {
                createCAtegoryList(cate.children, options)
            }
        }
        return options;
    }


    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {
                            renderCategories(category.categoryReducer.categories)
                        }
                    </Col>
                </Row>
            </Container>
            <NewModal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
            >
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select
                    value={parentCategoryId}
                    className='form-control'
                    onChange={(e) => setParentCategoryId(e.target.value)}>
                    <option> Select Category</option>
                    {
                        createCAtegoryList(category.categoryReducer.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>
                <Input
                    type="file"
                    name={categoryImage}
                    onChange={(e) => setCategoryImage(e.target.files[0])}
                />
            </NewModal>
        </Layout>
    )

}