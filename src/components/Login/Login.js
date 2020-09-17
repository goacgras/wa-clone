import React from 'react'
import { Button } from '@material-ui/core'

import { auth, provider } from '../../firebase';
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../reducer/auth';

import './Login.css';

function Login() {
    const dispatch = useStateValue()[1];

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => dispatch({
                type: actionType.SET_USER,
                user: result.user
            }))
            .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__container">

                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign in with google
                </Button>

            </div>

        </div>
    )
}

export default Login
