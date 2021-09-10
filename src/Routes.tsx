import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';

import EntryEditorPage from './pages/EntryEditorPage';
import WorkspacePage from './pages/WorkspacePage';
import InsightsPage from './pages/InsightsPage';
import SearchPage from './search/SearchPage';

import LoginPage from './auth/LoginPage';

export default function Routes() {
    return (
        <>
            <QueryParamProvider ReactRouterRoute={Route}>
                <Switch>
                    <Route path="/login" exact>
                        <LoginPage />
                    </Route>
                    <Route path="/workspace" exact>
                        <WorkspacePage />
                    </Route>
                    <Route path="/workspace/:entryId" exact>
                        <EntryEditorPage />
                    </Route>
                    <Route path="/insights" exact>
                        <InsightsPage />
                    </Route>
                    <Route path="/search" exact>
                        <SearchPage />
                    </Route>
                </Switch>
            </QueryParamProvider>
        </>
    )
}