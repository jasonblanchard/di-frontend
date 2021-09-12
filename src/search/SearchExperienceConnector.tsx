import React, { useState, useEffect } from 'react'
import { NotebookClient, v2ListEntriesResponse } from "@jasonblanchard/di-apis"

import getCsrfToken from '../utils/getCsrfToken';

interface SearchExperienceConnectorProps {
    children: (arg0: SearchExperienceConnectorRenderProps) => React.ReactElement
}

interface Entry {
    id: string
    text: string
}

interface SearchExperienceConnectorRenderProps {
    entries: Entry[]
    hasNextPage: boolean
    onClickMore: () => void
}

const csrfToken = getCsrfToken();
const path = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" : ""}${window.location.port ? window.location.port : ""}/notebook`
const notebookClient = new NotebookClient(path)
notebookClient.setRequestHeadersHandler(headers => ({
  ...headers,
  'CSRF-Token': csrfToken,
}));

export default function SearchExperienceConnector({ children }: SearchExperienceConnectorProps) {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [, setIsEntriesLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [nextCursor, setNextCursor] = useState("");

    useEffect(() => {
        async function fetchEntries() {
        setIsEntriesLoading(true);
        const response = await notebookClient.Notebook_ListEntries({
            pageSize: 50,
        })
        const body: v2ListEntriesResponse = response.body
        const entries = body.entries || []

        setEntries(entries.map((entry) => ({
            id: entry.id || "",
            text: entry.text || "",
        })));
        setHasNextPage(body.has_next_page || false);
        setNextCursor(body.next_page_token || "");
        setIsEntriesLoading(false);
        }
        fetchEntries();
    }, []);

    async function onClickMore() {
        const response = await notebookClient.Notebook_ListEntries({
            pageSize: 50,
            pageToken: nextCursor,
        })
        const body: v2ListEntriesResponse = response.body
        const entries = body.entries || []
        const nextEntries = entries.map((entry) => ({
            id: entry.id || "",
            text: entry.text || "",
        }))
        setEntries(entries => [...entries, ...nextEntries]);
        setHasNextPage(body.has_next_page || false);
        setNextCursor(body.next_page_token || "");
    }

    return children({
        entries: entries,
        onClickMore,
        hasNextPage,
    })
}