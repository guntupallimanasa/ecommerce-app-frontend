import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout';
import { Navbar, Container, Nav, Row, Col, Button, form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory, updateCategories, deleteCategoriesAction } from '../../actions';
import { Input } from '../../components/UI/Input';
import { NewModal } from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowDown,
    IoIosArrowForward,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './style.css';
/**
* @author
* @function Category
**/

export const Category = (props) => {

    const [show, setShow] = useState(false);

    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);

    const [expandedArray, setExpandedArray] = useState([]);
    const [checkedArrray, setCheckedArrray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

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
            category.push(
                {
                    label: cate.name,
                    value: cate._id,
                    children: cate.children.length > 0 && renderCategories(cate.children)
                }
            )
        }
        return category;
    }
    const createCAtegoryList = (categories, options = []) => {
        for (let cate of categories) {
            options.push({ 
                value: cate._id,
                 name: cate.name,
                  parentId: cate.parentId,
                  type: cate.type
                 });
            if (cate.children.length > 0) {
                createCAtegoryList(cate.children, options)
            }
        }
        return options;
    }

    const updateCategory = () => {
        updateCheckedandExpandedCategories()
        setUpdateCategoryModal(true);


    }

    const updateCheckedandExpandedCategories = () => {
        const categories = createCAtegoryList(category.categoryReducer.categories);
        const checkedArrray = [];
        const expandedArray = [];

        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArrray.push(category);
        })

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category);
        })
        setCheckedArrray(checkedArrray);
        setExpandedArray(expandedArray);
    }
    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArrray.map((item, _index) => index == _index ? {
                ...item,
                [key]: value
            } : item)
            setCheckedArrray(updatedCheckedArray)
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? {
                ...item,
                [key]: value
            } : item)
            setExpandedArray(updatedExpandedArray)
        }
    }

    const updateCategoriesForm = () => {

        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append("_id", item.value);
            form.append("name", item.name);
            form.append("type", item.type);
            form.append("parentId", item.parentId ? item.parentId : "");
        })

        checkedArrray.forEach((item, index) => {
            form.append("_id", item.value);
            form.append("name", item.name);
            form.append("type", item.type);
            form.append("parentId", item.parentId ? item.parentId : "");
        })
        dispatch(updateCategories(form))
        setUpdateCategoryModal(false);
    }

    const deleteCategories = () => {
        const checkedIdArray = checkedArrray.map((item, index) => ({ _id: item.value }))
        const expandedIdArray = expandedArray.map((item, index) => ({ _id: item.value }))
        const idsArray = expandedIdArray.concat(checkedIdArray);
        console.log('>>>idsArray', idsArray)
        if (checkedIdArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdArray))
            setDeleteCategoryModal(false)
        }
    }

    const renderDeleteCategoryModal = () => {
        return (<NewModal
            show={deleteCategoryModal}
            handleClose={() => setDeleteCategoryModal(false)}
            modalTitle={'Confirm'}
            buttons={[
                {
                    label: 'No',
                    color: "primary",
                    onClick: () => {
                        alert('No')
                    }
                },
                {
                    label: 'Yes',
                    color: "danger",
                    onClick: deleteCategories
                }
            ]}
        >
            Are you sure
            <h5> Expanded</h5>
            {
                expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
            }
            <h5> Checked</h5>
            {
                checkedArrray.map((item, index) => <span key={index}>{item.name}</span>)
            }
        </NewModal>)
    }

    const renserUpdateCategoryModal = () => {
        return (<NewModal
            show={updateCategoryModal}
            handleClose={updateCategoriesForm}
            modalTitle={'Update Categories'}
            size="lg"
        >
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <Row>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </Col>

                        <Col>
                            <select
                                value={item.parentId}
                                className='form-control'
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option> Select Category</option>
                                {
                                    createCAtegoryList(category.categoryReducer.categories).map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className='form-control'
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}>
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            <h6>Checked</h6>
            {
                checkedArrray.length > 0 &&
                checkedArrray.map((item, index) =>
                    <Row>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Col>

                        <Col>
                            <select
                                value={item.parentId}
                                className='form-control'
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option> Select Category</option>
                                {
                                    createCAtegoryList(category.categoryReducer.categories).map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className='form-control'
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}>
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }


            <Input
                type="file"
                name={categoryImage}
                onChange={(e) => setCategoryImage(e.target.files[0])}
            />
        </NewModal>)
    }

    const deleteCategory = () => {
        setDeleteCategoryModal(true);
        updateCheckedandExpandedCategories()
    }

    const renderAddCategoryModal = () => {
        return (<NewModal
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
        </NewModal>)
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
                            <div className='actionBtnContainer'>
                                <button onClick={handleShow}><IoIosAdd /><span>Add</span></button>
                                <button onClick={deleteCategory}><IoIosTrash /><span>Delete</span></button>
                                <button onClick={updateCategory}><IoIosCloudUpload /><span>Edit</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* {
                            renderCategories(category.categoryReducer.categories)
                        } */}
                        <CheckboxTree
                            nodes={renderCategories(category.categoryReducer.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>

            </Container>
            {/* Add New Categories */}
            {
                renderAddCategoryModal()
            }
            {/* Edit categories */}
            {
                renserUpdateCategoryModal()
            }
            {/* Delete Categories */}
            {
                renderDeleteCategoryModal()
            }
        </Layout>
    )

}