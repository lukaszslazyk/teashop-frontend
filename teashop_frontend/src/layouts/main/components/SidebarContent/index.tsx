import { List, ListItem, ListItemText } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import EcoIcon from "@material-ui/icons/Eco";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import EcoTwoToneIcon from "@material-ui/icons/EcoTwoTone";
import EmojiFoodBeverageTwoToneIcon from "@material-ui/icons/EmojiFoodBeverageTwoTone";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import routing from "../../../../configuration/routing";
import usePrevious from "../../../../shared/hooks/usePrevious";
import useStyles from "../../styles";

interface Props {
    closeDrawer: () => void;
}

const SidebarContent = (props: Props) => {
    const { closeDrawer } = props;
    const [teaCategoryOpen, setTeaCategoryOpen] = useState(true);
    const location = useLocation();
    const prevLocation = usePrevious(location);
    const classes = useStyles();

    const isCurrentLocation = (routePath: string): boolean =>
        routePath === location.pathname;

    const handleTeaCategoryClicked = () =>
        setTeaCategoryOpen(teaCategoryOpen => !teaCategoryOpen);

    useEffect(() => {
        if (location !== prevLocation)
            closeDrawer();
    }, [location, prevLocation, closeDrawer]);

    return (
        <List>
            <ListItem
                button
                selected={isCurrentLocation(routing.home)}
                component={Link}
                to={routing.home}
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
                        component={Link}
                        to={routing.browseGreenTea}
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
                        component={Link}
                        to={routing.browseBlackTea}
                        className={classes.nestedListItem}
                    >
                        <EcoIcon className={classes.listItemIcon} />
                        <ListItemText>Black Tea</ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        selected={isCurrentLocation(routing.browseRedTea)}
                        component={Link}
                        to={routing.browseRedTea}
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
                        component={Link}
                        to={routing.browseWhiteTea}
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
                component={Link}
                to={routing.browseHerbs}
            >
                <EcoOutlinedIcon
                    className={`${classes.listItemIcon} ${classes.herbsIcon}`}
                />
                <ListItemText primary="Herbs" />
            </ListItem>
            <ListItem
                button
                selected={isCurrentLocation(routing.browseAccessories)}
                component={Link}
                to={routing.browseAccessories}
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
