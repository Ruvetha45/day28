import React, { useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
  } from "mdb-react-ui-kit";

  const ProductList = () => {
    const { cartState, dispatch } = useCart();
    const { items } = cartState;
  
    useEffect(() => {
      dispatch({ type: 'GET_CART_TOTAL' });
    }, [cartState, dispatch]);
  
    const addToCart = (product) => {
      // Call the addToCart function directly with the product
      dispatch({ type: 'ADD_TO_CART', payload: product });
    };
  
    return (
      <div className="m-2">
        <MDBContainer>
          <MDBRow className="mb-3">
            {items.map((item) => (
                <MDBCol key={item.id} size="md">
                <MDBCard>
                  <MDBCardImage src={item.img} style={{height: 100}} position="top" alt="..." />
                  <MDBCardBody>
                    <MDBCardTitle>{item.title}</MDBCardTitle>
                    <MDBCardText>{item.description}</MDBCardText>
                    <MDBCardText>{item.price}</MDBCardText>
                    <MDBBtn onClick={() => addToCart(item)}>Add to Cart</MDBBtn>                    
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
            </MDBRow>
          </MDBContainer>
        </div>
    );
  };
  

export default ProductList;