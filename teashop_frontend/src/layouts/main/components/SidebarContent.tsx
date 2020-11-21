import { List, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import EcoIcon from "@material-ui/icons/Eco";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import EcoTwoToneIcon from "@material-ui/icons/EcoTwoTone";
import EmojiFoodBeverageTwoToneIcon from "@material-ui/icons/EmojiFoodBeverageTwoTone";
import Collapse from "@material-ui/core/Collapse";
import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import useStyles from "../styles";

interface Props extends RouteComponentProps {}

function SidebarContent(props: Props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const isCurrentLocation = (location: string): boolean =>
        location === props.history.location.pathname;

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <List>
                <ListItem
                    button
                    selected={isCurrentLocation("/")}
                    component={Link}
                    to="/"
                >
                    <HomeRoundedIcon className={classes.listItemIcon} />
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <EcoTwoToneIcon
                        color="primary"
                        className={classes.listItemIcon}
                    />
                    <ListItemText>Tea</ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
                        <ListItem
                            button
                            selected={isCurrentLocation("/browse/GreenTea")}
                            component={Link}
                            to="/browse/GreenTea"
                            className={classes.nestedListItem}
                        >
                            <EcoIcon
                                className={`${classes.listItemIcon} ${classes.greenTeaIcon}`}
                            />
                            <ListItemText>Green Tea</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            selected={isCurrentLocation("/browse/BlackTea")}
                            component={Link}
                            to="/browse/BlackTea"
                            className={classes.nestedListItem}
                        >
                            <EcoIcon className={classes.listItemIcon} />
                            <ListItemText>Black Tea</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            selected={isCurrentLocation("/browse/RedTea")}
                            component={Link}
                            to="/browse/RedTea"
                            className={classes.nestedListItem}
                        >
                            <EcoIcon
                                className={`${classes.listItemIcon} ${classes.redTeaIcon}`}
                            />
                            <ListItemText>Red Tea</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            selected={isCurrentLocation("/browse/WhiteTea")}
                            component={Link}
                            to="/browse/WhiteTea"
                            className={classes.nestedListItem}
                        >
                            <EcoOutlinedIcon className={classes.listItemIcon} />
                            <ListItemText>White Tea</ListItemText>
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem
                    button
                    selected={isCurrentLocation("/browse/Herbs")}
                    component={Link}
                    to="/browse/Herbs"
                >
                    <EcoOutlinedIcon
                        className={`${classes.listItemIcon} ${classes.herbsIcon}`}
                    />
                    <ListItemText primary="Herbs" />
                </ListItem>
                <ListItem
                    button
                    selected={isCurrentLocation("/browse/Accessories")}
                    component={Link}
                    to="/browse/Accessories"
                >
                    <EmojiFoodBeverageTwoToneIcon
                        className={classes.listItemIcon}
                    />
                    <ListItemText primary="Accessories" />
                </ListItem>
            </List>
        </div>
    );
}

export default withRouter(SidebarContent);
