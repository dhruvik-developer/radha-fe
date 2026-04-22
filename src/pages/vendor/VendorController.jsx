import { useNavigate } from "react-router-dom";
import VendorComponent from "./VendorComponent";
import DeleteConfirmation from "../../Components/common/DeleteConfirmation";
import { useVendors } from "../../hooks/useVendors";
import useConfirmationMutation from "../../hooks/useConfirmationMutation";

function VendorController() {
  const navigate = useNavigate();
  const {
    data: vendors = [],
    isLoading: loading,
    refetch: refetchVendors,
  } = useVendors();
  const deleteVendorMutation = useConfirmationMutation({
    invalidateQueryKeys: [["vendors"]],
  });

  const handleAddVendor = () => {
    navigate("/add-vendor", { state: { mode: "add" } });
  };

  const handleEditVendor = (vendor) => {
    navigate(`/edit-vendor/${vendor.id}`, {
      state: { mode: "edit", vendorData: vendor },
    });
  };

  const handleDeleteVendor = (id) => {
    DeleteConfirmation({
      id,
      apiEndpoint: "/vendors",
      name: "vendor",
      successMessage: "Vendor deleted successfully!",
      onSuccess: refetchVendors,
      executeRequest: deleteVendorMutation.mutateAsync,
    });
  };

  return (
    <VendorComponent
      navigate={navigate}
      loading={loading}
      vendors={vendors}
      onVendorAdd={handleAddVendor}
      onVendorEdit={handleEditVendor}
      onVendorDelete={handleDeleteVendor}
    />
  );
}

export default VendorController;
