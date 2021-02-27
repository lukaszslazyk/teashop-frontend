import {
    Card,
    CardMedia,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import useStyles from "./styles";

interface Props {
    imageSrc: string;
    imageTitle: string;
    titlePrimary: string;
    titleSecondary: string;
    routePath: any;
}

const CarouselPanel = (props: Props) => {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

    const getPrimaryTypographyVariant = () => {
        if (isXsScreen)
            return "h5";
        if (isSmScreen)
            return "h4";
        return "h2";
    };

    const getSecondaryTypographyVariant = () => (isSmScreen ? "body1" : "h6");

    const handleCaptionClicked = () => history.push(props.routePath);

    return (
        <div className={classes.aspectRatioTopContainer}>
            <div className={classes.aspectRatioInnerContainer}>
                <Card className={classes.card}>
                    <CardMedia
                        image={props.imageSrc}
                        title={props.imageTitle}
                        className={classes.media}
                    >
                        <div
                            className={classes.mediaCaption}
                            onClick={handleCaptionClicked}
                        >
                            <Typography variant={getPrimaryTypographyVariant()}>
                                {props.titlePrimary}
                            </Typography>
                            <Typography
                                variant={getSecondaryTypographyVariant()}
                            >
                                {props.titleSecondary}
                            </Typography>
                        </div>
                    </CardMedia>
                </Card>
            </div>
        </div>
    );
};

export default CarouselPanel;
