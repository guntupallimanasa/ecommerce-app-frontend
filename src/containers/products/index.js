import React, { useState } from "react";
import { Layout } from "../../components/layout";
import {
  Navbar,
  Container,
  Table,
  Nav,
  Row,
  Col,
  Button,
  form,
  Modal,
} from "react-bootstrap";
import { Input } from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import { NewModal } from "../../components/UI/Modal";
import "./style.css";
import { generalPublicUrl } from "../../../src/urlConfig";
import {deleteProductById} from '../../actions'

/**
 * @author
 * @function Products
 **/

export const Products = (props) => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.categoryReducer);
  const product = useSelector((state) => state.productReducer);

  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);

  const handleClose = () => {
    const form = new FormData();

    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const createCAtegoryList = (categories, options = []) => {
    for (let cate of categories) {
      options.push({ value: cate._id, name: cate.name });
      if (cate.children.length > 0) {
        createCAtegoryList(cate.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table responsive="sm" style={{ fontSize: "12px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length >= 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <button onClick={() => showProductDetailsModal(product)}>
                      info
                    </button>
                    <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const showProductDetailsModal = (product) => {
    setProductDetailModal(true);
    setProductDetails(product);
  };

  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Poduct"}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={`quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={categoryId}
          className="form-control"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option> Select Category</option>
          {createCAtegoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <Input type="file" onChange={handleProductPictures} />
      </NewModal>
    );
  };

  const handlecloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };
  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    console.log(">>>>productDetails", productDetails);
    return (
      <NewModal
        show={productDetailModal}
        handleClose={handlecloseProductDetailsModal}
        modalTitle={"Poduct Details"}
        size="lg"
      >
        <Row>
          <Col md={6}>
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col style={{ display: "flex" }}>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImageContainer">
                  <img src={generalPublicUrl(picture.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };
  return (
    <Layout sidebar>
      <Row>
        <Col md={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3>Product</h3>
            <button onClick={handleShow}>Add</button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>{renderProducts()}</Col>
      </Row>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};
