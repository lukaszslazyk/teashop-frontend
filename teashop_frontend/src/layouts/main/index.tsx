import { Container, CssBaseline } from "@material-ui/core";
import React, { ReactNode, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopAppBar from "./components/TopAppBar";
import useStyles from "./styles";

interface Props {
    maxWidth?: false | "md" | "xs" | "sm" | "lg" | "xl" | undefined;
    children: ReactNode;
}

const MainLayout = (props: Props) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () =>
        setMobileOpen(!mobileOpen);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopAppBar handleDrawerToggle={handleDrawerToggle} />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Container
                maxWidth={props.maxWidth ? props.maxWidth : "lg"}
                disableGutters
            >
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {props.children}
                </main>
            </Container>
        </div>
    );
};

export default MainLayout;
