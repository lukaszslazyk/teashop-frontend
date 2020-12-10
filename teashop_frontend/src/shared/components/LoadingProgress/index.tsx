import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import useStyles from "./styles";

const delayRenderTimeMillis = 1000;

const PageLoadingProgress = () => {
    const classes = useStyles();
    const [timeoutPassed, setTimeoutPassed] = React.useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutPassed(true);
        }, delayRenderTimeMillis);
        return () => clearTimeout(timer);
    }, [timeoutPassed]);

    if (!timeoutPassed)
        return null;

    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
};

export default PageLoadingProgress;
