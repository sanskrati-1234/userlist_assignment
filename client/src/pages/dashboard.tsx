import { useEffect, useState } from "react";
import Table from "../common/table";
import type { ColumnDef } from "@tanstack/react-table";
import type { UserSchema } from "../components/UserForm/userSchema";
import Filter from "../components/Filter/filter";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { io as socketIOClient } from "socket.io-client";
import styles from "./dashboard.module.css";

const headers: ColumnDef<UserSchema>[] = [
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Role", accessorKey: "role" },
];

const PAGE_SIZE = 10;

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [searchParams, _] = useSearchParams();
  const [filteredUsers, setFilteredUsers] = useState<UserSchema[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3000/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();

    // Socket.io setup
    const socket = socketIOClient("http://localhost:3000");
    socket.on("userAdded", (user: UserSchema) => {
      setUsers((prev) => [user, ...prev]);
      toast.info(`A new user has been added: ${user.name}`);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const nameMatch = user.name
        .toLowerCase()
        .includes((searchParams.get("search") || "").toLowerCase());
      const roleParam = searchParams.get("role");
      const roleMatch =
        !roleParam || roleParam === "all" || user.role === roleParam;
      return nameMatch && roleMatch;
    });
    setFilteredUsers(filtered);
  }, [searchParams, users]);

  // Simulate paginated data
  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>Dashboard</div>
      <div className={styles.filterBar}>
        <Filter />
      </div>
      <div className={styles.tableWrapper}>
        <Table
          headers={headers}
          data={paginatedData}
          totalRecords={filteredUsers.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
