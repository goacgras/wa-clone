import React from 'react'

import Sidebar from '../../containers/Sidebar/Sidebar';

import classes from './SideDrawer.module.css';

function SideDrawer() {
    return (
        <div className={classes.SideDrawer}>
            <div className={classes.SideBar}>
                <Sidebar />
            </div>
        </div>
    )
}

export default SideDrawer
