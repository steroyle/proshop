import { Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const deleteHandler = (productId) => {
    console.log(productId);
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3">
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {
        isLoading
          ? <Loader />
          : error
            ? <Message variant="danger">{error}</Message>
            : (
              <>
                <Table striped hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                          <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button className="btn-sm mx-2">
                              <FaEdit /> Edit
                            </Button>
                          </LinkContainer>
                          <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                            <FaTrash style={{ color: "white" }} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>              
            )
      }
    </>
  )
}

export default ProductListScreen