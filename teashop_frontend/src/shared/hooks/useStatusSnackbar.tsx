import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useSnackbar } from "notistack";
import React from "react";

export type Status = "success" | "info" | "error" | "warning";

const useStatusSnackbar = (status: Status) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const enqueueStatusSnackbar = (message: string) => {
        enqueueSnackbar(message, {
            variant: status,
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
            },
            autoHideDuration: 1500,
            action: key => (
                <IconButton
                    style={{color: "white"}}
                    onClick={() => closeSnackbar(key)}
                >
                    <CloseIcon style={{width: 20}} />
                </IconButton>
            ),
        });
    };

    return enqueueStatusSnackbar;
};

export default useStatusSnackbar;
