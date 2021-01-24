import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useSnackbar } from "notistack";
import React from "react";
import useStyles from "./styles";

export type Status = "success" | "info" | "error" | "warning";

const useStatusSnackbar = (status: Status) => {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const enqueueStatusSnackbar = (message: string) => {
        enqueueSnackbar(message, {
            variant: status,
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
            },
            autoHideDuration: 3000,
            action: key => (
                <IconButton
                    className={classes.snackBarCloseButton}
                    onClick={() => {
                        closeSnackbar(key);
                    }}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ),
        });
    };

    return enqueueStatusSnackbar;
};

export default useStatusSnackbar;
