import React, { useState, useEffect } from 'react'

import { Avatar } from '@material-ui/core'

import './SidebarChat.css';

function SidebarChat({ addNewChat }) {
    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const addNewChatHandler = () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            //do smthg on database
        }
    }

    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>Last Message...</p>
            </div>
        </div>
    ) : (
            <div
                className="sidebarChat"
                onClick={addNewChatHandler}>

                <h2>Add new Chat</h2>
            </div>
        )
}

export default SidebarChat
