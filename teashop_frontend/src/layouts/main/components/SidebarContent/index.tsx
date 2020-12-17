import { List, ListItem, ListItemText } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import EcoIcon from "@material-ui/icons/Eco";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import EcoTwoToneIcon from "@material-ui/icons/EcoTwoTone";
import EmojiFoodBeverageTwoToneIcon from "@material-ui/icons/EmojiFoodBeverageTwoTone";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import routing from "../../../../configuration/routing";
import useStyles from "../../styles";

interface Props {
    closeDrawer: () => void;
}

const SidebarContent = (props: Props) => {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [teaCategoryOpen, setTeaCategoryOpen] = useState(true);

    const isCurrentLocation = (routePath: string): boolean =>
        routePath === location.pathname;

    const handleTeaCategoryClicked = () =>
        setTeaCategoryOpen(teaCategoryOpen => !teaCategoryOpen);

    const handleMenuLinkClicked = (routePath: string) => {
        props.closeDrawer();
        history.push(routePath);
    };

    return (
        <List>
            <ListItem
                button
                selected={isCurrentLocation(routing.home)}
                onClick={() => handleMenuLinkClicked(routing.home)}
            >
                <HomeRoundedIcon className={classes.listItemIcon} />
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={handleTeaCategoryClicked}>
                <EcoTwoToneIcon
                    color="primary"
                    className={classes.listItemIcon}
                />
                <ListItemText>Tea</ListItemText>
                {teaCategoryOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={teaCategoryOpen} timeout="auto" unmountOnExit>
                <List>
                    <ListItem
                        button
                        selected={isCurrentLocation(routing.browseGreenTea)}
                        onClick={() =>
                            handleMenuLinkClicked(routing.browseGreenTea)
                        }
                        className={classes.nestedListItem}
                    >
                        <EcoIcon
                            className={`${classes.listItemIcon} ${classes.greenTeaIcon}`}
                        />
                        <ListItemText>Green Tea</ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        selected={isCurrentLocation(routing.browseBlackTea)}
                        onClick={() =>
                            handleMenuLinkClicked(routing.browseBlackTea)
                        }
                        className={classes.nestedListItem}
                    >
                        <EcoIcon className={classes.listItemIcon} />
                        <ListItemText>Black Tea</ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        selected={isCurrentLocation(routing.browseRedTea)}
                        onClick={() =>
                            handleMenuLinkClicked(routing.browseRedTea)
                        }
                        className={classes.nestedListItem}
                    >
                        <EcoIcon
                            className={`${classes.listItemIcon} ${classes.redTeaIcon}`}
                        />
                        <ListItemText>Red Tea</ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        selected={isCurrentLocation(routing.browseWhiteTea)}
                        onClick={() =>
                            handleMenuLinkClicked(routing.browseWhiteTea)
                        }
                        className={classes.nestedListItem}
                    >
                        <EcoOutlinedIcon className={classes.listItemIcon} />
                        <ListItemText>White Tea</ListItemText>
                    </ListItem>
                </List>
            </Collapse>
            <ListItem
                button
                selected={isCurrentLocation(routing.browseHerbs)}
                onClick={() => handleMenuLinkClicked(routing.browseHerbs)}
            >
                <EcoOutlinedIcon
                    className={`${classes.listItemIcon} ${classes.herbsIcon}`}
                />
                <ListItemText primary="Herbs" />
            </ListItem>
            <ListItem
                button
                selected={isCurrentLocation(routing.browseAccessories)}
                onClick={() => handleMenuLinkClicked(routing.browseAccessories)}
            >
                <EmojiFoodBeverageTwoToneIcon
                    className={classes.listItemIcon}
                />
                <ListItemText primary="Accessories" />
            </ListItem>
        </List>
    );
};

export default SidebarContent;
