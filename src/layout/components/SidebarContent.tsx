import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

function SidebarContent(props: Props) {
    const isCurrentLocation = (location: string): boolean => {
        return location === props.history.location.pathname;
    };

    return (
        <div>
            <List>
                <ListItem button selected={isCurrentLocation("/")} component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button selected={isCurrentLocation("/browse")} component={Link}  to="/browse">
                    <ListItemText primary="Browse" />
                </ListItem>
            </List>
        </div>
    );
}

export default withRouter(SidebarContent);
