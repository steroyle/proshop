import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUsersQuery } from '../../slices/usersApiSlice';

const UserListScreen = () => {

  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const deleteHandler = (id) => {
  }

  return <>
    <h1>Users</h1>
    {isLoading
      ? <Loader />
      : error
        ? <Message variant='danger'>{error}</Message>
        : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>
                      {
                        user.isAdmin
                          ? (<FaCheck style={{ color: "green" }} />)
                          : (<FaTimes style={{ color: "red" }} />)
                      }
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button className="btn-sm" variant="light"><FaEdit /></Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        )
    }
  </>
}

export default UserListScreen;