import { useNavigate } from "react-router-dom";
import UserComponent from "./UserComponent";
import { useUsers } from "../../hooks/useUsers";
import DeleteConfirmation from "../../Components/common/DeleteConfirmation";

function UserController() {
  const navigate = useNavigate();
  const {
    data: users = [],
    isLoading: loading,
    refetch: refetchUsers,
  } = useUsers();

  // Handle Add Users
  const handleAddUsers = () => {
    navigate("/add-user", { state: { mode: "addUser" } });
  };

  // Handle Edit Users
  const handleEditUsers = (id) => {
    navigate(`/edit-user/${id}`, { state: { mode: "editUser" } });
  };

  // Handle Delete Users
  const handleDeleteUsers = (id) => {
    DeleteConfirmation({
      id,
      apiEndpoint: "/users",
      name: "user",
      successMessage: "User deleted successfully!",
      onSuccess: refetchUsers,
    });
  };

  return (
    <UserComponent
      navigate={navigate}
      loading={loading}
      users={users}
      onUserAdd={handleAddUsers}
      onUserEdit={handleEditUsers}
      onUserDelete={handleDeleteUsers}
    />
  );
}

export default UserController;
