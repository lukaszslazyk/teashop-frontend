import { Button, Grid } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import ErrorInfo from '../../../../shared/components/ErrorInfo';

const EmptyCartView = () => (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <ErrorInfo
                title="Your cart is empty"
                errorMessage="Continue shopping and add some items to your cart."
            />
        </Grid>
        <Grid item xs={12}>
            <Grid container justify="center">
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/"
                    >
                        Back to main page
                    </Button>
                </Grid>
            </Grid>                                
        </Grid>
    </Grid>    
)


export default EmptyCartView;
