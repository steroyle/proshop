import { useEffect } from 'react';
import { Card, Col, Row, Image, Button, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { toast } from 'react-toastify';


const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress.address, paymentMethod, navigate]);

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap(); // unwrap because its a promise

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);      
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <CheckoutSteps step step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Address:</strong>{
                `
                ${cart.shippingAddress.address},
                ${cart.shippingAddress.city},
                ${cart.shippingAddress.postalCode},
                ${cart.shippingAddress.country}
                `
              }</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method:</strong> {cart.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {
                cart.cartItems.length === 0
                  ? (<Message>Your cart is empty</Message>)
                  : (
                    <ListGroup variant='flush'>
                      {
                        cart.cartItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={1}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                              </Col>
                              <Col>
                                <Link to={`/product/${item._id}`}>{item.name}</Link>
                              </Col>
                              <Col md={4}>
                                {`${item.qty} X £${ item.price } = £${ item.qty * item.price}`}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))
                      }
                    </ListGroup>
                  )
              }
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>£{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>£{cart.shippingPrice}</Col>
                  </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>£{cart.taxPrice}</Col>
                  </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>£{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                { isLoading && <Loader /> }
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen;