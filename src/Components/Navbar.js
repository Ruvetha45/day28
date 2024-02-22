import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBBtn } from 'mdb-react-ui-kit';
import { useCart } from '../Context/CartContext';

const Navbar = () => {
  const { cartState } = useCart();
  const { totalQuantity } = cartState;

  return (
    <MDBNavbar light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand>Mobiles</MDBNavbarBrand>
        <span>
          <Link to="/">All Product</Link>
        </span>
        <MDBBtn color="light">
          <Link to="/cart">Cart ({totalQuantity})</Link>
        </MDBBtn>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;