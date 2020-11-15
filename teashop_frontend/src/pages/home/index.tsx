import { Typography } from "@material-ui/core";
import React from "react";
import MainLayout from "../../layouts/main";

const HomePage = () => {
    return (
        <MainLayout>
            <Typography variant="h3" align="center" noWrap>
                Welcome to Tea Shop
            </Typography>
        </MainLayout>
    );
};

export default HomePage;
