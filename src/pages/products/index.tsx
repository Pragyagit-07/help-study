// pages/products/index.tsx
import { useEffect, useState, useCallback } from "react";
import { useProductsStore } from "@/store/productsStore";
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Box,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";

export default function Products() {
  const {
    products,
    total,
    fetchProducts,
    searchProducts,
    fetchProductsByCategory,
  } = useProductsStore();

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const rowsPerPage = 12;

  // fetch categories once (array of strings)
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        if (Array.isArray(res.data)) setCategories(res.data);
        else console.warn("Unexpected categories response:", res.data);
      })
      .catch((err) => console.error("categories fetch error", err));
  }, []);

  // fetch products on page/category change
  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory, rowsPerPage, page * rowsPerPage);
    } else {
      fetchProducts(rowsPerPage, page * rowsPerPage);
    }
  }, [page, selectedCategory, fetchProducts, fetchProductsByCategory]);

  // search (debounce recommended for production)
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSearch(v);
    setPage(0);
    if (v.trim()) {
      searchProducts(v);
    } else {
      // re-fetch current category or all products
      if (selectedCategory) fetchProductsByCategory(selectedCategory, rowsPerPage, 0);
      else fetchProducts(rowsPerPage, 0);
    }
  }, [selectedCategory, fetchProducts, searchProducts, fetchProductsByCategory]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" my={3} fontWeight={700} textAlign={{ xs: "center", md: "left" }}>
        Browse All Products
      </Typography>

      <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} mb={2}>
        <TextField label="Search Products" fullWidth value={search} onChange={handleSearch} />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => {
              setSelectedCategory(String(e.target.value));
              setPage(0);
            }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
               <MenuItem key={cat.slug} value={cat.slug}>
                 {cat.name}
               </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} mt={2}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                image={p.thumbnail}
                alt={p.title}
                sx={{ width: "100%", height: { xs: 180, sm: 200, md: 220 }, objectFit: "contain", backgroundColor: "#f8f8f8" }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontSize={{ xs: "1rem", sm: "1.1rem" }}>{p.title}</Typography>
                <Typography color="text.secondary" fontSize="0.9rem">Brand: {p.brand}</Typography>
                <Typography color="text.secondary" fontSize="0.9rem">Category: {p.category}</Typography>

                <Box display="flex" alignItems="center" mt={1} justifyContent="space-between">
                  <Typography fontWeight={700}>₹ {p.price}</Typography>
                  <Rating value={p.rating ?? 0} readOnly precision={0.1} size="small" />
                </Box>

                <Box mt={2}>
                  <Link href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" fullWidth>View Details</Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <Pagination
          count={Math.max(1, Math.ceil(total / rowsPerPage))}
          page={page + 1}
          onChange={(e, value) => setPage(value - 1)}
          color="primary"
          shape="rounded"
          variant="outlined"
        />
      </Box>
    </Container>
  );
}
