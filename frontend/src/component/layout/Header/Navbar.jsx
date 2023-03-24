import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";

function Navbara() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <Navbar id="Nav" bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" height="100" width="100" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {categories.map((cate) => (
                <NavDropdown.Item href="/products" key={cate}>
                  {cate}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="outline-success" onClick={searchSubmitHandler}>
                Search
              </Button>
            </Form>

            <Nav.Link href="/cart">
              <ShoppingCartIcon />
              Cart ({cartItems.length})
            </Nav.Link>
            <Nav.Link href="/login">
              <AccountCircleIcon />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbara;
