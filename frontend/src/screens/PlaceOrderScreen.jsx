import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import CheckoutSteps from '../components/CheckoutSteps';


const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress.address, paymentMethod, navigate]);


  return (
    <>
      <CheckoutSteps step step2 step3 step4 />
      <Row>
        <Col md={8}>Col</Col>
        <Col md={4}>Col</Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen;