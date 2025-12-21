import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaUserShield,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaUtensils,
  FaLock,
  FaUsersCog,
} from "react-icons/fa";
import useTitle from "../../../Hooks/useTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  useTitle("Manage Users");
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ uid, updateData }) => {
      const res = await axiosSecure.patch(
        `/users/update-role/${uid}`,
        updateData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        title: "Success!",
        text: "User profile has been updated.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire("Error", "Failed to update user permissions.", "error");
    },
  });

  const getRoleBadge = (role) => {
    const roles = {
      admin: {
        color: "text-red-600 bg-red-100",
        icon: <FaUserShield />,
        label: "Admin",
      },
      chef: {
        color: "text-orange-600 bg-orange-100",
        icon: <FaUtensils />,
        label: "Chef",
      },
      user: {
        color: "text-blue-600 bg-blue-100",
        icon: <FaUser />,
        label: "User",
      },
    };
    const current = roles[role] || roles.user;
    return (
      <span
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${current.color}`}
      >
        {current.icon} {current.label}
      </span>
    );
  };

  const handleAction = (uid, userName, updateData, actionName) => {
    Swal.fire({
      title: `Confirm ${actionName}?`,
      text: `Are you sure you want to update ${userName}'s account?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F97316",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Update",
    }).then((result) => {
      if (result.isConfirmed) {
        updateMutation.mutate({ uid, updateData });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <FaSpinner className="animate-spin text-5xl text-orange-600 mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">
          Loading secure user data...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-t-[2rem] border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center">
            <FaUsersCog className="mr-4 text-orange-600" /> User Directory
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage permissions, roles, and account status
          </p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-2xl">
          <span className="text-orange-600 font-black text-2xl">
            {users.length}
          </span>
          <span className="text-orange-800 dark:text-orange-300 text-xs font-bold uppercase tracking-widest">
            Total Users
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-b-[2rem] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">
                  User Details
                </th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                  Identity
                </th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                  Administrative Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <AnimatePresence>
                {users.map((user) => (
                  <motion.tr
                    key={user.uid}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center font-black text-orange-700 text-xl border-2 border-white dark:border-gray-600 shadow-sm">
                          {user.displayName?.charAt(0) || "A"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                            {user?.displayName || "Anonymous User"}
                          </p>

                          <p className="text-xs text-gray-500 font-medium">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6 text-center">
                      <div className="flex justify-center">
                        {getRoleBadge(user.role)}
                      </div>
                    </td>

                    <td className="px-8 py-6 text-center">
                      {user.status === "fraud" ? (
                        <span className="inline-flex items-center gap-1.5 text-red-500 font-bold text-xs uppercase tracking-tight">
                          <FaTimesCircle className="text-sm" /> Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-emerald-500 font-bold text-xs uppercase tracking-tight">
                          <FaCheckCircle className="text-sm" /> Active
                        </span>
                      )}
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-2">
                        {user.role !== "admin" && (
                          <>
                            <ActionButton
                              icon={<FaUserShield />}
                              label="Admin"
                              onClick={() =>
                                handleAction(
                                  user.uid,
                                  user.displayName,
                                  { role: "admin" },
                                  "Make Admin"
                                )
                              }
                              variant="red"
                            />
                            <ActionButton
                              icon={<FaUtensils />}
                              label="Chef"
                              disabled={user.role === "chef"}
                              onClick={() =>
                                handleAction(
                                  user.uid,
                                  user.displayName,
                                  { role: "chef" },
                                  "Make Chef"
                                )
                              }
                              variant="orange"
                            />
                            <ActionButton
                              icon={<FaLock />}
                              label="Suspend"
                              disabled={user.status === "fraud"}
                              onClick={() =>
                                handleAction(
                                  user.uid,
                                  user.displayName,
                                  { status: "fraud" },
                                  "Suspend Account"
                                )
                              }
                              variant="gray"
                            />
                          </>
                        )}
                        {user.role === "admin" && (
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                            Root Admin
                          </span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

const ActionButton = ({ icon, onClick, disabled, variant, label }) => {
  const variants = {
    red: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white",
    orange: "bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white",
    gray: "bg-gray-50 text-gray-600 hover:bg-gray-800 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm disabled:opacity-20 disabled:cursor-not-allowed ${variants[variant]}`}
      title={label}
    >
      {icon}
      <span className="hidden xl:inline font-bold text-[10px] uppercase">
        {label}
      </span>
    </button>
  );
};

export default ManageUsers;
