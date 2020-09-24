import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase';

import { IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic';
import DrawerToggle from '../../components/SideDrawer/DrawerToggle/DrawerToggle';

import './Chat.css'
import { useStateValue } from '../../context/StateProvider';


function Chat({drawerToggleClick}) {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const { user } = useStateValue()[0];

    useEffect(() => {
        // console.log(roomId);
        // go to database and pull the room name save it to roomName
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            //get messages from database
            db.collection('rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()))
                );
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);

        db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <DrawerToggle clicked={drawerToggleClick} />

                {/* <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} /> */}

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen {" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>

                    <IconButton>
                        <AttachFile />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p
                        key={message.timestamp}
                        className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>

                        <span
                            className="chat__name">{message.name}
                        </span>

                        {message.message}

                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={input}
                        onChange={(event) => setInput(event.target.value)} />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
