import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import DashboardLayout from '@/components/DashboardLayout';

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const { login, token } = useAuthStore();
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    await login(data.username, data.password);
    router.push('/dashboard'); // redirect to dashboard after login
  };

  if (token) {
    router.push('/dashboard');
    return null;
  }

  return (
    <DashboardLayout hideNavbar> {/* Navbar hidden here */}
      <Container
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{ padding: 4, width: "100%", borderRadius: 2, backgroundColor: "#fff" }}
        >
          <Typography variant="h5" align="center" mb={2}>
            Admin Login
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField {...register('username')} label="Username" fullWidth margin="normal" />
            <TextField {...register('password')} label="Password" type="password" fullWidth margin="normal" />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </DashboardLayout>
  );
}
