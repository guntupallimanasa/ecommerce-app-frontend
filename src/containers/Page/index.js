import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/layout'
import { Input } from '../../components/UI/Input';
import { NewModal } from '../../components/UI/Modal';
import { createPage } from '../../actions';

/**
* @author
* @function Page
**/

export const Page = (props) => {

    const category = useSelector(state => state.categoryReducer);
    const page = useSelector(state => state.pageReducer);
    const dispatch = useDispatch();

    const [createPageModal, setCreatePageModal] = useState(false)
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])
    const [type, setType] = useState('')

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

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]])
    }

    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]])
    }

    const submitPageForm = (e) => {
        if (title == '') {
            alert('Title is empty')
            setCreatePageModal(false)
            return;
        }
        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('category', categoryId);
        form.append('type', type);

        banners.forEach((banner, index) => {
            form.append('banners', banner)
        })
        products.forEach((product, index) => {
            form.append('products', product)
        })

        dispatch(createPage(form));

    }

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value == e.target.value)
        setType(category.type);
        setCategoryId(e.target.value)
    }


    useEffect(() => {
        setCategories(createCAtegoryList(category.categories));
    }, [category])

    const renderCreatePageModal = () => {
        return (<NewModal
            show={createPageModal}
            handleClose={submitPageForm}
            modalTitle={'Create New Page'}
        >
            <Row>
                <Col>
                    <select
                        className='form-control'
                        value={categoryId}
                        onChange={onCategoryChange}>
                        <option> Select Category</option>
                        {
                            categories.map(cat =>
                                <option key={cat.value} value={cat.value}>{cat.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        className='form-control'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={'Page Title'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        className='form-control'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={'Page Description'}
                    />
                </Col>
            </Row>
            <Row>
                {
                    banners.length > 0 ?
                        banners.map((banner, index) =>
                            <Row>
                                <Col>{banner.name}</Col>
                            </Row>) : null
                }
                <Col>
                    <Input
                        className='form-control'
                        type="file"
                        name="Banners"
                        onChange={handleBannerImages}
                    />
                </Col>
            </Row>
            <Row>
                {
                    products.length > 0 ?
                        products.map((product, index) =>
                            <Row>
                                <Col>{product.name}</Col>
                            </Row>) : null
                }
                <Col>
                    <Input
                        className='form-control'
                        type="file"
                        name="Products"
                        onChange={handleProductImages}
                    />
                </Col>
            </Row>

        </NewModal>)
    }

    return (
        <Layout sidebar>
            {
                page.loading ?
                    <p>Loading.....</p> : <div>
                        {
                            renderCreatePageModal()
                        }
                        <button onClick={() => setCreatePageModal(true)}>Create Page</button>
                    </div>
            }

        </Layout>
    )

}