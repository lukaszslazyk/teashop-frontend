import { Drawer } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import useStyles from "../styles/mainLayoutStyles";
import SidebarContent from "./SidebarContent";

interface Props {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

const Sidebar = (props: Props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            classes={{
                paper: classes.drawerPaper,
            }}
            ModalProps={{
                keepMounted: true,
            }}
        >
            {/* <div className={props.classes.toolbar} > </div> */}
            <SidebarContent></SidebarContent>
        </Drawer>
    );
};

export default Sidebar;
