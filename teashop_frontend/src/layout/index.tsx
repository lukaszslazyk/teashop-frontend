import { Container, CssBaseline } from "@material-ui/core";
import React, { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../configuration/reduxSetup/rootReducer";
import Sidebar from "./components/Sidebar";
import TopAppBar from "./components/TopAppBar";
import useStyles from "./styles";

interface Props {
    children: ReactNode;
}

const Layout = (props: Props) => {
    const interactionDisabledForLoading = useSelector(
        (state: RootState) => state.shared.interactionDisabledForLoading
    );
    const [drawerOpen, setDrawerOpen] = useState(false);
    const classes = useStyles();

    const handleMenuButtonClicked = () => setDrawerOpen(true);

    const handleDrawerOpen = () => setDrawerOpen(true);

    const handleDrawerClose = () => setDrawerOpen(false);

    return (
        <div
            className={`${classes.root} ${
                interactionDisabledForLoading
                    ? classes.loadingWithInteractionBlocking
                    : ""
            }`}
        >
            <CssBaseline />
            <TopAppBar onMenuButtonClick={handleMenuButtonClicked} />
            <Sidebar
                drawerOpen={drawerOpen}
                onDrawerOpen={handleDrawerOpen}
                onDrawerClose={handleDrawerClose}
            />
            <Container disableGutters>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {props.children}
                </main>
            </Container>
        </div>
    );
};

export default Layout;
