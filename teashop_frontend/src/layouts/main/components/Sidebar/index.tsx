import { SwipeableDrawer } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import useStyles from "../../styles";
import SidebarContent from "../SidebarContent";

interface Props {
    drawerOpen: boolean;
    onDrawerOpen: () => void;
    onDrawerClose: () => void;
}

const Sidebar = (props: Props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <SwipeableDrawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.drawerOpen}
            onOpen={props.onDrawerOpen}
            onClose={props.onDrawerClose}
            classes={{
                paper: classes.drawerPaper,
            }}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <SidebarContent closeDrawer={props.onDrawerClose}></SidebarContent>
        </SwipeableDrawer>
    );
};

export default Sidebar;
