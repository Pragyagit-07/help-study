

// components/DashboardLayout.tsx
import { Container, Box } from "@mui/material";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
  hideNavbar?: boolean; // optional flag, default false
}

export default function DashboardLayout({ children, hideNavbar = false }: Props) {
  return (
    <Box>
      {!hideNavbar && <Navbar />} {/* Navbar hidden if hideNavbar=true */}
      <Container maxWidth="lg">
        <Box py={3}>{children}</Box>
      </Container>
    </Box>
  );
}
