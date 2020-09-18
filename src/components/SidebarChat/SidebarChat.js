import React, { useState, useEffect } from 'react'
import db from '../../firebase';
import { Link } from 'react-router-dom'

import { Avatar } from '@material-ui/core'

import './SidebarChat.css';

function SidebarChat({ addNewChat, id, name }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', "desc")
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map((doc) => (
                        doc.data()))
                    )
                ));
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const addNewChatHandler = () => {
        const roomName = prompt("Please enter name for chat room");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
        }
    }

    return !addNewChat ? (
        // passing the url by id from db
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (
            <div
                className="sidebarChat"
                onClick={addNewChatHandler}>

                <h2>Add new Chat</h2>
            </div>
        )
}

export default SidebarChat
