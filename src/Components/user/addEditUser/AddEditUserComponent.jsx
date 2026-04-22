/* eslint-disable react/prop-types */
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "../../common/formInputs/Input";

function AddEditUserComponent({
  navigate,
  mode,
  form,
  errors,
  onSubmit,
  onInputChange,
}) {
  const isEdit = mode === "editUser";
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-auto mx-auto mt-10">
      <button
        type="button"
        className="px-4 py-2 mb-[10px] font-medium bg-gray-300 border border-gray-300 rounded-md cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          {isEdit ? "Change User Password" : "Add New User"}
        </h2>
      </div>

      <form onSubmit={onSubmit}>
        {!isEdit && (
          <>
            <Input
              label="User Name:"
              type="text"
              placeholder={
                errors.username ? errors.username : "Enter Your User Name"
              }
              name="username"
              value={form.username}
              className={`w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] 
                                ${errors.username ? "border-red-500 placeholder-red-500" : "border-gray-300"}`}
              onChange={onInputChange}
              autoComplete="none"
            />

            <Input
              label="Email:"
              type="text"
              placeholder={
                errors.email ? errors.email : "Enter Your Mail Address"
              }
              name="email"
              value={form.email}
              className={`w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] 
                                ${errors.email ? "border-red-500 placeholder-red-500" : "border-gray-300"}`}
              onChange={onInputChange}
            />
            <p className="text-xs text-gray-500 mb-2">
              Optional
            </p>
          </>
        )}

        {isEdit ? (
          <p className="text-sm text-gray-500 mb-3">
            User profile update API abhi backend me available nahi hai. Yahan
            se sirf password change hota hai.
          </p>
        ) : null}

        <div className="mb-4">
          <Input
            label={isEdit ? "New Password:" : "Password:"}
            type="password"
            placeholder={
              errors.password
                ? errors.password
                : isEdit
                  ? "Enter New Password"
                  : "Enter Password"
            }
            name="password"
            value={form.password}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] 
                            ${errors.password ? "border-red-500 placeholder-red-500" : "border-gray-300"}`}
            onChange={onInputChange}
            error={errors.password}
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-center justify-center mt-2">
          <button
            type="submit"
            className={`w-auto bg-[var(--color-primary)] text-white rounded-md cursor-pointer ${isEdit ? "p-2" : "px-6 py-2"}`}
          >
            {isEdit ? "Update User" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditUserComponent;
