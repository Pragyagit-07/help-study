import { useEffect, useState } from "react";
import { useUsersStore } from "@/store/usersStore";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Container,
  Typography,
  Paper,
  Box,
  InputAdornment,
  Button,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";

export default function Users() {
  const { users, total, fetchUsers, searchUsers } = useUsersStore();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const rowsPerPage = 10;

  useEffect(() => {
    fetchUsers(rowsPerPage, page * rowsPerPage);
  }, [page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value.trim());

    if (value.trim()) searchUsers(value);
    else fetchUsers(rowsPerPage, page * rowsPerPage);
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
        Manage and Browse all user
        </Typography>
      
      </Box>

      {/* Search Bar */}
      <TextField
        placeholder="Search users..."
        fullWidth
        value={search}
        onChange={handleSearch}
        margin="normal"
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Table */}
      <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Company</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f9f9f9" },
                  }}
                >
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.company?.name}</TableCell>
                  <TableCell align="center">
                    <Link href={`/users/${user.id}`} passHref>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<VisibilityIcon />}
                      >
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Pagination */}
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Pagination
            count={Math.ceil(total / rowsPerPage)}
            page={page + 1}
            onChange={(e, value) => setPage(value - 1)}
            color="primary"
            shape="rounded"
            variant="outlined"
          />
        </Box>
      </Paper>
    </Container>
  );
}
