import React from 'react';
import { useCart } from '../Context/CartContext';

const CartPage = () => {
  const { cartState, dispatch } = useCart();
  const { cart, totalPrice } = cartState;

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const increaseQuantity = (productId) => {
    dispatch({ type: 'INCREASE_ITEM_QUANTITY', payload: productId });
  };

  const decreaseQuantity = (productId) => {
    dispatch({ type: 'DECREASE_ITEM_QUANTITY', payload: productId });
  };


  return (

    <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-body">
                  {cart?.map((data) => (
                    <div className="row">

                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img style={{height: 100, width: 150}}
                            src={data.img}
                            alt="Blue Jeans Jacket"
                          />
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{data.title}</strong>
                        </p>
                        <small>{data.description}</small>

                        
                      </div>

                      <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <div
                          className="d-flex mb-4"
                          style={{ maxWidth: "300px" }}
                        >
                          <button
                            className="btn btn-primary btn-sm me-1 mb-2"
                            onClick={() => decreaseQuantity(data.id)}
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <div className="form-outline">
                            <label
                              id="form1"
                              min="0"
                              name="quantity"                              
                              type="number"
                              className="form-control"
                              onChange={() => null}
                            >{data.quantity}</label>                            
                          </div>

                          <button className="btn btn-primary btn-sm me-1 mb-2"
                            onClick={() => increaseQuantity(data.id)}><i className="fas fa-plus"></i>
                          </button>

                          </div>
                          </div>

                          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item d-flex justify-content-around border-0 px-0 pb-0">
                              <strong>{data.price}</strong>
                              <span><button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        data-mdb-toggle="tooltip"
                                        title="Remove item"
                                        onClick={() => removeFromCart(data.id)}
                                      >
                                      <i className="fas fa-trash"></i>
                                    </button></span>
                              </li>
                            </ul>
                          </div>
                        </div>
                ))}

                <div className="row">
                <hr className="my-4" />
                  <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Sub total
                      <span>{totalPrice}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Shipping
                      <span>Free</span>
                    </li>
                    
                    <hr className="my-4" />

                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>{totalPrice}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
);
};

export default CartPage;