import { Grid } from "@material-ui/core";
import React from "react";
import MainCarousel from "./components/MainCarousel";
import RecommendedProductsPanel from "./components/RecommendedProductsPanel";

const HomePage = () => (
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <MainCarousel />
        </Grid>
        <Grid item xs={12}>
            <RecommendedProductsPanel />
        </Grid>
    </Grid>
);

export default HomePage;
