import { useEffect, useState } from "react";
import { Table, Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axios/axiosInstance"; // import axios instance của bạn

type UserType = {
  _id: string;
  userName: string;
  isAdmin: boolean;
};

const UserPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user list
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/users");
      setUsers(res.data); // giả sử API trả về mảng users
    } catch (err) {
      toast.error("Không thể tải danh sách user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle role
  const handleToggleRole = async (user: UserType) => {
    if (!user._id) return toast.error("User ID không hợp lệ");

    try {
      await axiosInstance.put(`/users/${user._id}`, {
        isAdmin: !user.isAdmin,
      });
      toast.success(`Cập nhật role cho ${user.userName} thành công`);
      // Reload lại danh sách
      fetchUsers();
    } catch (err) {
      toast.error("Cập nhật role thất bại");
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">User Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Role (Admin)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>{user.userName}</td>
              <td>
                <Form.Check
                  type="switch"
                  id={`admin-switch-${user._id}`}
                  checked={user.isAdmin}
                  onChange={() => handleToggleRole(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserPage;
