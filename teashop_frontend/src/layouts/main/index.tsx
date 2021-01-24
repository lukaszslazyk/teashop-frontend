import { Container, CssBaseline } from "@material-ui/core";
import React, { ReactNode, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopAppBar from "./components/TopAppBar";
import useStyles from "./styles";

interface Props {
    children: ReactNode;
}

const MainLayout = (props: Props) => {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMenuButtonClicked = () => setDrawerOpen(true);

    const handleDrawerOpen = () => setDrawerOpen(true);

    const handleDrawerClose = () => setDrawerOpen(false);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopAppBar onMenuButtonClick={handleMenuButtonClicked} />
            <Sidebar
                drawerOpen={drawerOpen}
                onDrawerOpen={handleDrawerOpen}
                onDrawerClose={handleDrawerClose}
            />
            <Container
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
