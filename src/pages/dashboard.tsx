// // pages/dashboard.tsx




import { Box, Typography, Grid, Button, Paper, Chip } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Link from "next/link";

export default function DashboardPage() {
  const stats = {
    users: 120, 
    products: 120,
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      textAlign="center"
      gap={4}
      px={2}
    >
      <Typography variant="h3" fontWeight={700}>
        Welcome, Admin!
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Quick access to manage users and products.
      </Typography>

      <Grid container spacing={4} justifyContent="center" mt={2}>
        {/* Users Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
            }}
          >
            <PeopleIcon fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight={600} mt={1}>
              Manage Users
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              View all registered users, edit details, and manage access.
            </Typography>
            <Chip
              label={`Total: ${stats.users}`}
              color="primary"
              sx={{ mt: 2 }}
            />
            <Box mt={3}>
              <Link href="/users" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth>
                  Go to Users
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>

        {/* Products Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
            }}
          >
            <Inventory2Icon fontSize="large" color="secondary" />
            <Typography variant="h6" fontWeight={600} mt={1}>
              Manage Products
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Add new products, view inventory, and update product details.
            </Typography>
            <Chip
              label={`Total: ${stats.products}`}
              color="secondary"
              sx={{ mt: 2 }}
            />
            <Box mt={3}>
              <Link href="/products" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth color="secondary">
                  Go to Products
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

