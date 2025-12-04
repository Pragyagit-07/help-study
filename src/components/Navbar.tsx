import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";

export default function Navbar() {
  const { logout } = useAuthStore();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
    handleMenuClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="primary" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        {/* Desktop Buttons */}
        <Box sx={{ display: { xs: "none", md: "flex" } }} gap={2}>
          <Link href="/users">
            <Button variant="text" sx={{ color: "white" }}>
              Users
            </Button>
          </Link>

          <Link href="/products">
            <Button variant="text" sx={{ color: "white" }}>
              Products
            </Button>
          </Link>

          <Button variant="text" sx={{ color: "white" }} onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link href="/users">Users</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/products">Products</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
