import React, { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { idTokenState } from '../auth/state';
import { Route, RouteProps, Redirect } from 'react-router-dom';

interface AuthenticatedRouteProps extends RouteProps {}

const AuthenticatedRoute: FunctionComponent<AuthenticatedRouteProps> = ({ children, ...routeProps }) => {
    const idToken = useRecoilValue(idTokenState);

    if (!idToken) {
        return (
            <Redirect to="/login" />
        )
    }

    return (
        <Route {...routeProps}>
            {children}
        </Route>
    );
}

export default AuthenticatedRoute;