import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import React from 'react';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const SwipeableBottomDrawer: React.FunctionComponent = () => {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (opened: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        //if event not triggered from click => Don't do anything
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(opened);
    };

    return (
        <React.Fragment key={'bottom'}>
            <Button onClick={toggleDrawer(true)}>click this bottom</Button>
            <SwipeableDrawer
                anchor={'bottom'}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                some random stuff to list
                    </SwipeableDrawer>
        </React.Fragment>
    );
}
export default SwipeableBottomDrawer;