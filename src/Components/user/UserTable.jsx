/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function UsersTable({ users, onUserEdit, onUserDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[640px] w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">#</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              User Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                {/* Users details */}
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.username || "N/A"}
                </td>
                <td className={`border border-gray-300 px-4 py-2`}>
                  {user.email || "-"}
                </td>

                {/* Main Action */}
                <td className="border border-gray-300 px-4 py-2 text-center min-w-[160px]">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      title="Edit Password"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[var(--color-primary)] hover:bg-purple-100 transition-colors"
                      onClick={() => onUserEdit(user.id)}
                    >
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>

                    <button
                      onClick={() => onUserDelete(user.id)}
                      title="Delete User"
                      className="text-[#d33] hover:text-red-700 cursor-pointer"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                <div className="flex justify-center items-center gap-2 text-yellow-500">
                  <IoIosWarning size={30} />
                  <p className="text-center text-red-500 text-xl font-semibold py-4">
                    No Users Available!
                  </p>
                  <IoIosWarning size={30} />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
