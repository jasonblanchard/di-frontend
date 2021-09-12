import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Link, Redirect } from 'react-router-dom';

import { idTokenState } from './state';

declare global {
    interface Window { google: any; }
}

export default function LoginPage() {
    const [, setIdToken] = useRecoilState(idTokenState);
    const [didSetToken, setDidSetToken] = useState(false);

    useEffect(() => {
        function handleCredentialResponse(response: any) {
            console.log(response.credential);
            setIdToken(response.credential);
            setDidSetToken(true);
        }

        window.google.accounts.id.initialize({
            // client_id: '691474794551-sf5s8aprb3dnus95ic78048l2497ornp.apps.googleusercontent.com',
            client_id: '559697359407-jt47o7vg9idv8qh68j9ccbvij9bkudvc.apps.googleusercontent.com',
            callback: handleCredentialResponse,
            auto_select: true
        });

        window.google.accounts.id.prompt();

        window.google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
            theme: 'outline',
            size: 'large',
        });
    }, [setIdToken]);

    return (
        <div>
            {didSetToken && <Redirect to="/workspace" />}
            <div id="buttonDiv"></div>
            <div>
                {didSetToken && <Link to="/workspace">Workspace</Link>}
            </div>
        </div>
    )
}