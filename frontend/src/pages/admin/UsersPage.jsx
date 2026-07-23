import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { getUsers, deleteUser } from "../../api/admin/user";
import { AddUserModal } from "../../components/admin/user-table/AddUserModal";
import { UserPreview } from "../../components/admin/user-table/UserPreview";
import { Pagination } from "../../components/admin/user-table/Pagination";

const formatDate = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatus = (user) => {
  if (user.isBlocked) {
    return { label: "Blocked", classes: "bg-red-100 text-red-700" };
  }
  if (!user.isVerified) {
    return { label: "Pending", classes: "bg-amber-100 text-amber-700" };
  }
  return { label: "Verified", classes: "bg-emerald-100 text-emerald-700" };
};

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  return parts.length > 1
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : `${parts[0][0] ?? ""}`.toUpperCase();
};

export const UsersPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [addUserModal, setAddUserModal] = useState(false);
  const [userPreview, setUserPreview] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 4;

  const handleUserAdded = (newUser) => {
    setUsersData((prev) => [newUser, ...prev]);
    setCurrentPage(1);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsersData((prev) => prev.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
  };

  const closeUserModal = () => {
    setAddUserModal(false);
    setEditingUser(null);
  };

  const handleUserDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete user?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
      });

      if (!result.isConfirmed) return;

      await deleteUser(id);
      setUsersData((prev) => prev.filter((user) => user._id !== id));

      await Swal.fire({
        title: "Deleted",
        text: "User deleted successfully.",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (err) {
      await Swal.fire({
        title: "Delete failed",
        text: err?.response?.data?.message || err.message || "Failed to delete user.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getUsers();
        setUsersData(res.data.users || []);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return usersData
      .filter((user) => {
        if (!search.trim()) return true;
        const query = search.toLowerCase();
        return (
          user.name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user._id?.toLowerCase().includes(query)
        );
      })
      .filter((user) => {
        if (roleFilter === "all") return true;
        return user.role === roleFilter;
      })
      .filter((user) => {
        if (statusFilter === "all") return true;
        if (statusFilter === "active") return !user.isBlocked;
        if (statusFilter === "blocked") return user.isBlocked;
        return true;
      });
  }, [usersData, search, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const activePage = Math.min(currentPage, totalPages);

  const pagedUsers = useMemo(() => {
    const start = (activePage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, activePage]);

  return (
    <>
      <main className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground-950 font-heading">
                Users
              </h1>
              <p className="text-sm text-foreground-500 mt-1">
                Showing {filteredUsers.length} of {usersData.length} users
              </p>
            </div>
            <button onClick={()=>setAddUserModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium hover:bg-primary-600 transition-all duration-200 cursor-pointer whitespace-nowrap">
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-user-add-line"></i>
              </span>
              Add User
            </button>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-">
            <div className="p-4 border-b border-background-200/70 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-foreground-400">
                  <i className="ri-search-line text-sm"></i>
                </span>
                <input
                  placeholder="Search by name, email, or ID..."
                  className="w-full pl-10 pr-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-700 outline-none focus:border-primary-300 transition-colors cursor-pointer"
                  value={roleFilter}
                  onChange={(e) => {
                    setRoleFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <select
                  className="px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-700 outline-none focus:border-primary-300 transition-colors cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-background-200/70 bg-background-100/50">
                    <th className="py-3 px-4 text-left w-10">
                      <input
                        className="rounded border-background-300 text-primary-500 focus:ring-primary-400 cursor-pointer"
                        type="checkbox"
                      />
                    </th>
                    <th className="py-3 px-2 text-left text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap cursor-pointer select-none">
                      <span className="flex items-center gap-1.5">
                        User
                        <i className="ri-arrow-up-down-line text-xs text-foreground-300"></i>
                      </span>
                    </th>
                    <th className="py-3 px-2 text-left text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap cursor-pointer select-none  md:table-cell">
                      <span className="flex items-center gap-1.5">
                        Role
                        <i className="ri-arrow-up-down-line text-xs text-foreground-300"></i>
                      </span>
                    </th>
                    <th className="py-3 px-2 text-left text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap cursor-pointer select-none  sm:table-cell">
                      <span className="flex items-center gap-1.5">
                        Status
                        <i className="ri-arrow-up-down-line text-xs text-foreground-300"></i>
                      </span>
                    </th>
                    <th className="py-3 px-2 text-left text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap cursor-pointer select-none  xl:table-cell">
                      <span className="flex items-center gap-1.5">
                        Joined
                        <i className="text-xs text-primary-500 ri-arrow-down-line"></i>
                      </span>
                    </th>
                    <th className="py-3 px-2 text-left text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap cursor-pointer select-none  lg:table-cell">
                      <span className="flex items-center gap-1.5">
                        Last Login
                        <i className="ri-arrow-up-down-line text-xs text-foreground-300"></i>
                      </span>
                    </th>
                    <th className="py-3 px-2 text-right text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-sm text-foreground-500">
                        Loading users...
                      </td>
                    </tr>
                  )}

                  {error && !loading && (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-sm text-red-600">
                        {error}
                      </td>
                    </tr>
                  )}

                  {!loading && !error && filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-sm text-foreground-500">
                        No users found.
                      </td>
                    </tr>
                  )}

                  {!loading && !error && pagedUsers.map((user) => (
                    
                    <tr
                      key={user._id}
                      className="border-b border-background-100 hover:bg-background-100/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <input
                          className="rounded border-background-300 text-primary-500 focus:ring-primary-400 cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 overflow-">
                            {user.profileImage ? (
                              <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-bold text-primary-700">
                                {getInitials(user.name)}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground-900 truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-foreground-400 truncate">
                              {user.email}
                            </p>
                            <p className="text-xs text-foreground-500 truncate">
                              {user.role}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2  md:table-cell">
                        <p className="text-sm font-medium text-foreground-900 truncate">
                          {user.role}
                        </p>
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap  sm:table-cell">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatus(user).classes}`}>
                          {getStatus(user).label}
                        </span>
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap text-sm text-foreground-600  xl:table-cell">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap text-sm text-foreground-500  lg:table-cell">
                        {formatDate(user.updatedAt)}
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={()=>{ setSelectedUser(user); setUserPreview(true); }}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:text-primary-500 hover:bg-primary-50 transition-all duration-200 cursor-pointer"
                            title="Preview"
                          >
                            <span className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-eye-line"></i>
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setEditingUser(user);
                              setAddUserModal(true);
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:text-foreground-700 hover:bg-background-100 transition-all duration-200 cursor-pointer"
                            title="Edit"
                          >
                            <span className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-edit-line"></i>
                            </span>
                          </button>
                          <button onClick={()=>handleUserDelete(user._id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                            title="Delete"
                          >
                            <span className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-delete-bin-line"></i>
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={activePage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              pageSize={PAGE_SIZE}
              totalItems={filteredUsers.length}
            />
          </div>
        </div>
        
        {/** Modal Start */}
         {addUserModal && (
           <AddUserModal
             editUser={editingUser}
             onUserAdded={handleUserAdded}
             onUserUpdated={handleUserUpdated}
             onClose={closeUserModal}
           />
         )}

         {/** Modal User Preview */}
         {userPreview && selectedUser && (
           <UserPreview
             user={selectedUser}
             onClose={() => {
               setUserPreview(false);
               setSelectedUser(null);
             }}
           />
         )}
      </main>
    </>
  );
};
