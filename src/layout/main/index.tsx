import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import Sidebar from "./components/Sidebar";
import TopAppBar from "./components/TopAppBar";

interface Props {
    children: React.ReactNode;
}

const MainLayout = (props: Props) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopAppBar handleDrawerToggle={handleDrawerToggle} />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Container>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {props.children}
                </main>
            </Container>
        </div>
    );
};

export default MainLayout;
