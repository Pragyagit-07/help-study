import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Avatar,
  Divider,
  Fade
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/users/${id}`)
        .then(res => setUser(res.data));
    }
  }, [id]);

  if (!user)
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6">Loading user details...</Typography>
      </Container>
    );

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh"
      }}
    >
      <Fade in timeout={600}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 4,
            width: "100%",
            textAlign: "center",
            background: "#fff",
          }}
        >
          {/* Back Button */}
          <Box display="flex" justifyContent="flex-start" mb={2}>
            <Link href="/users" style={{ textDecoration: "none" }}>
              <Button startIcon={<ArrowBackIcon />}>Back</Button>
            </Link>
          </Box>

          {/* Avatar */}
          <Avatar
            src={user.image}
            sx={{ width: 120, height: 120, margin: "auto", mb: 2 }}
          />

          {/* Title */}
          <Typography variant="h4" fontWeight={600} gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Info Section */}
          <Box textAlign="left" mt={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              ✉ Email:
            </Typography>
            <Typography mb={1}>{user.email}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              👤 Gender:
            </Typography>
            <Typography mb={1}>{user.gender}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              📞 Phone:
            </Typography>
            <Typography mb={1}>{user.phone}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              🏢 Company:
            </Typography>
            <Typography>{user.company?.name}</Typography>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}



