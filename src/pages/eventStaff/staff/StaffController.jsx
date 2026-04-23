import { useNavigate } from "react-router-dom";
import StaffComponent from "./StaffComponent";
import { useStaff } from "../../../hooks/useStaff";
import DeleteConfirmation from "../../../Components/common/DeleteConfirmation";

function StaffController() {
  const navigate = useNavigate();
  const {
    data: staffList = [],
    isLoading: loading,
    refetch: refetchStaff,
  } = useStaff();

  // Handle Add
  const handleAddStaff = () => {
    navigate("/add-staff", { state: { mode: "add" } });
  };

  // Handle Edit
  const handleEditStaff = (staff) => {
    navigate(`/edit-staff/${staff.id}`, {
      state: { mode: "edit", staffData: staff },
    });
  };

  // Handle Delete
  const handleDeleteStaff = (id) => {
    DeleteConfirmation({
      id,
      apiEndpoint: "/staff",
      name: "event staff member",
      successMessage: "Staff deleted successfully!",
      onSuccess: refetchStaff,
    });
  };

  // Handle Payment Summary (Fixed Staff)
  const handlePaymentSummary = (id) => {
    navigate(`/fixed-staff-payments/${id}`);
  };

  return (
    <StaffComponent
      navigate={navigate}
      loading={loading}
      staffList={staffList}
      onStaffAdd={handleAddStaff}
      onStaffEdit={handleEditStaff}
      onStaffDelete={handleDeleteStaff}
      onStaffPaymentSummary={handlePaymentSummary}
    />
  );
}

export default StaffController;
