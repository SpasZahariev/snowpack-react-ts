import { List, ListItem, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import * as React from 'react';
import './SwipeableBottomDrawer.css';

type Props = {
    handleAbout: () => void;
    handleExperience: () => void;
    handleProjects: () => void;
    handleContact: () => void;
    children: React.ReactNode;
}

const SwipeableBottomDrawer: React.FunctionComponent<Props> = (props) => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleAboutAndClose = async () => {
        props.handleAbout();
        //idk why it is not working without this hack. I suspect drawer close is async too
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDrawerOpen(false);
    }
    const handleExperienceAndClose = async () => {
        props.handleExperience();
        //idk why it is not working without this hack. I suspect drawer close is async too
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDrawerOpen(false);
    }
    const handleProjectsAndClose = async () => {
        props.handleProjects();
        //idk why it is not working without this hack. I suspect drawer close is async too
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDrawerOpen(false);
    }
    const handleContactAndClose = async () => {
        props.handleContact();
        //idk why it is not working without this hack. I suspect drawer close is async too
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDrawerOpen(false);
    }
    const navigationList = () => {
        return (
            <List>
                <ListItem button onClick={() => handleAboutAndClose()}>
                    <ListItemText primary={'About Me'} />
                </ListItem>

                <ListItem button onClick={() => handleExperienceAndClose()}>
                    <ListItemText primary={'Experience'} />
                </ListItem>

                <ListItem button onClick={() => handleProjectsAndClose()}>
                    <ListItemText primary={'Featured Projects'} />
                </ListItem>

                <ListItem button onClick={() => handleContactAndClose()}>
                    <ListItemText primary={'Contact Information'} />
                </ListItem>
            </List >
        );
    }

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
            {/* <Button onClick={toggleDrawer(true)}>click this bottom</Button> */}
            <div onClick={toggleDrawer(true)}>
                {props.children}
            </div>
            <SwipeableDrawer
                anchor={'bottom'}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {navigationList()}
            </SwipeableDrawer>
        </React.Fragment>
    );
}
export default SwipeableBottomDrawer;