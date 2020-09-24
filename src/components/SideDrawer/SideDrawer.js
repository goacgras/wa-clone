import React from 'react'

import SidebarChat from '../../components/SidebarChat/SidebarChat';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../hoc/Auxiliary';

import classes from './SideDrawer.module.css';

function SideDrawer({ rooms, closed, opened }) {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(opened) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={opened} clicked={closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.SideBar}>
                    {
                        rooms.map(room => (
                            <SidebarChat
                                key={room.id}
                                id={room.id}
                                name={room.data.name} />
                        ))
                    }
                </div>
            </div>
        </Aux>
    )
}

export default SideDrawer
