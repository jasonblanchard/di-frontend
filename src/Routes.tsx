import React from 'react';
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';

import EntryEditorPage from './pages/EntryEditorPage';
import WorkspacePage from './pages/WorkspacePage';
import InsightsPage from './pages/InsightsPage';
import SearchPage from './search/SearchPage';
import AuthenticatedRoute from './components/AuthenticatedRoute';

import LoginPage from './auth/LoginPage';

export default function Routes() {
    return (
        <>
            <QueryParamProvider ReactRouterRoute={Route}>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/login" exact>
                        <LoginPage />
                    </Route>
                    <AuthenticatedRoute path="/workspace" exact>
                        <WorkspacePage />
                    </AuthenticatedRoute>
                    <AuthenticatedRoute path="/workspace/:entryId" exact>
                        <EntryEditorPage />
                    </AuthenticatedRoute>
                    <AuthenticatedRoute path="/insights" exact>
                        <InsightsPage />
                    </AuthenticatedRoute>
                    <AuthenticatedRoute path="/search" exact>
                        <SearchPage />
                    </AuthenticatedRoute>
                </Switch>
            </QueryParamProvider>
        </>
    )
}