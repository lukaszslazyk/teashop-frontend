import { Button, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect } from "react";

const defaultErrorMessage =
    "Error occurred! Please refresh page or try again later.";

const useStyles = makeStyles({
    snackBarCloseButton: {
        color: "#fff",
    },
});

const useErrorSnackbar = (
    error: boolean,
    message: string = defaultErrorMessage
) => {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const enqueueErrorSnackbar = useCallback(() => {
        enqueueSnackbar(message, {
            variant: "error",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
            },
            autoHideDuration: 3000,
            action: (key) => (
                <Button
                    className={classes.snackBarCloseButton}
                    onClick={() => {
                        closeSnackbar(key);
                    }}
                >
                    Dismiss
                </Button>
            ),
        });
    }, [message, classes, enqueueSnackbar, closeSnackbar]);

    useEffect(() => {
        error && enqueueErrorSnackbar();
    }, [error, enqueueErrorSnackbar]);
};

export default useErrorSnackbar;
