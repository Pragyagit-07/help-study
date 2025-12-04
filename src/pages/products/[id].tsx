import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Link from "next/link";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/products/${id}`).then((res) => setProduct(res.data));
    }
  }, [id]);

  if (!product) return <Typography textAlign="center">Loading...</Typography>;

  return (
    <Container sx={{ mt: 5, mb: 5, position: "relative" }}>
      {/* Top-right Back button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Link href="/products">
          <Button variant="contained">Back to Products</Button>
        </Link>
      </Box>

      {/* Product Image */}
      <Card sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden", mb: 3 }}>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{
            width: "100%",
            height: { xs: 250, sm: 350, md: 450 },
            objectFit: "contain",
            backgroundColor: "#f5f5f5",
          }}
        />
      </Card>

      {/* Product Details */}
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          {product.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={1}>
          Brand: {product.brand}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={1}>
          Category: {product.category}
        </Typography>
        <Typography variant="h5" fontWeight={700} mb={2}>
          ₹ {product.price}
        </Typography>
        <Typography variant="body1">{product.description}</Typography>
      </Box>
    </Container>
  );
}
