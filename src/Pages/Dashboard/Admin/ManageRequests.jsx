import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaClipboardCheck,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaEnvelope,
  FaTags,
} from "react-icons/fa";
import useTitle from "../../../Hooks/useTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useAuth } from "../../../Providers/AuthProvider";

const ManageRequests = () => {
  useTitle("Manage Requests");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1. Fetch Requests using TanStack Query
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["admin-requests"],
    enabled: !loading && !!user, // ONLY fetch when user is confirmed logged in
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/requests");
      return res.data;
    },
  });

  // 2. Mutation for Processing (Approve/Reject)
  const processMutation = useMutation({
    mutationFn: async ({ requestId, status, chefId }) => {
      const payload = { status };
      if (chefId) payload.chefId = chefId;
      const res = await axiosSecure.patch(
        `/admin/request/${requestId}/process`,
        payload
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["admin-requests"]);
      queryClient.invalidateQueries(["users"]); // Invalidate users so roles update there too
      Swal.fire({
        title: "Processed!",
        text: "The request has been successfully updated.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to process request. Please try again.",
        "error"
      );
    },
  });

  // --- UI Helpers ---
  const generateUniqueChefId = () =>
    `chef-${Math.floor(1000 + Math.random() * 9000)}`;

  const getStatusBadge = (status) => {
    const badges = {
      approved: "text-emerald-600 bg-emerald-100 border-emerald-200",
      rejected: "text-rose-600 bg-rose-100 border-rose-200",
      pending: "text-amber-600 bg-amber-100 border-amber-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
          badges[status] || badges.pending
        }`}
      >
        {status}
      </span>
    );
  };

  const handleProcess = (requestId, status, userName, requestType) => {
    const isAccepting = status === "approved";

    Swal.fire({
      title: `${isAccepting ? "Approve" : "Reject"} Request?`,
      text: `Confirming ${status} for ${userName}'s ${requestType} application.`,
      icon: isAccepting ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: isAccepting ? "#10B981" : "#EF4444",
      confirmButtonText: `Yes, ${status}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        const chefId =
          isAccepting && (requestType === "chef" || requestType === "chef-role")
            ? generateUniqueChefId()
            : null;
        processMutation.mutate({ requestId, status, chefId });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <FaSpinner className="animate-spin text-5xl text-red-600 mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">
          Scanning pending requests...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-t-[2rem] border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center">
            <FaClipboardCheck className="mr-4 text-red-600" /> Role Requests
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Review and approve user role upgrade applications
          </p>
        </div>
        {requests.length > 0 && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-5 py-2 rounded-2xl border border-red-100 dark:border-red-800">
            <FaClock className="text-red-600 animate-pulse" />
            <span className="text-red-700 dark:text-red-400 font-bold">
              {requests.filter((r) => r.status === "pending").length} Pending
            </span>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-b-[2rem] shadow-2xl overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-20 text-center">
            <div className="inline-flex p-6 bg-gray-50 dark:bg-gray-700 rounded-full mb-4 text-gray-300">
              <FaClipboardCheck className="text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-400">
              No applications found
            </h3>
            <p className="text-gray-500">
              When users apply for Chef/Admin roles, they will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Applicant
                  </th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                    Requested Role
                  </th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                    Current Status
                  </th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                    Decision
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <AnimatePresence>
                  {requests.map((request) => (
                    <motion.tr
                      key={request._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors group"
                    >
                      {/* User Info */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center">
                            <FaUser className="text-gray-400" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white">
                              {request.userName || "Unknown User"}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <FaEnvelope className="text-[10px]" />{" "}
                              {request.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-8 py-6 text-center">
                        <span
                          className={`inline-flex items-center gap-1 font-bold text-sm ${
                            request.requestType?.includes("admin")
                              ? "text-red-500"
                              : "text-orange-500"
                          }`}
                        >
                          <FaTags className="text-[10px]" />
                          {request.requestType?.split("-")[0].toUpperCase()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-8 py-6 text-center">
                        {getStatusBadge(request.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-3">
                          {request.status === "pending" ? (
                            <>
                              <button
                                onClick={() =>
                                  handleProcess(
                                    request._id,
                                    "approved",
                                    request.userName,
                                    request.requestType
                                  )
                                }
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                              >
                                <FaCheck /> Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleProcess(
                                    request._id,
                                    "rejected",
                                    request.userName,
                                    request.requestType
                                  )
                                }
                                className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                              >
                                <FaTimes /> Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                              Processed at{" "}
                              {new Date(
                                request.processedAt || Date.now()
                              ).toLocaleDateString()}
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
        )}
      </div>
    </motion.div>
  );
};

export default ManageRequests;
