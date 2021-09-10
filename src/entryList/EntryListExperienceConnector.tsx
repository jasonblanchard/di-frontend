import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { NotebookClient, v2ListEntriesResponse } from "@jasonblanchard/di-apis"
import { useRecoilValue } from 'recoil';
import { idTokenState } from '../auth/state';

import entryPreview from './entryPreview';
import getCsrfToken from '../utils/getCsrfToken';

interface EntryPreview {
  id: string;
  preview: string;
}

interface Patch {
  [key: string]: {
    text: string
  }
}

interface EntryListExperienceConnectorProps {
  children: (arg0: EntryListExperienceConnectorRenderProps) => React.ReactElement;
  patches?: Patch;
}

export interface EntryListExperienceConnectorRenderProps {
  entries: EntryPreview[];
  isEntriesLoading: boolean;
  onClickNew: () => void;
  onClickMore: () => void;
  showNextButton: boolean;
}

export default function EntryListExperienceConnector({ children, patches }: EntryListExperienceConnectorProps) {
  const [entries, setEntries] = useState<EntryPreview[]>([]);
  const [isEntriesLoading, setIsEntriesLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextCursor, setNextCursor] = useState("");
  const history = useHistory();
  const idToken = useRecoilValue(idTokenState);

  const path = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" : ""}${window.location.port ? window.location.port : ""}/api`
  const notebookClient = new NotebookClient(path)
  notebookClient.setRequestHeadersHandler(headers => ({
    ...headers,
    'Authorization': `Bearer ${idToken}`,
  }));

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
        preview: entryPreview(entry.text || "")
      })));
      setHasNextPage(body.has_next_page || false);
      setNextCursor(body.next_page_token || "");
      setIsEntriesLoading(false);
    }
    fetchEntries();
  }, []);

  async function onClickNew() {
    const { body: entry } = await notebookClient.Notebook_CreateEntry({
      body: {
        text: ""
      }
    })

    setEntries(entries => ([
      {
        id: entry.id,
        preview: entryPreview(''),
      },
      ...entries,
    ]));

    history.push(`/workspace/${entry.id}`)
  }

  async function onClickMore() {
    const response = await notebookClient.Notebook_ListEntries({
      pageSize: 50,
      pageToken: nextCursor,
    })
    const body: v2ListEntriesResponse = response.body
    const entries = body.entries || []
    const nextEntries = entries.map((entry) => ({
      id: entry.id || "",
      preview: entryPreview(entry.text || "")
    }))
    setEntries(entries => [...entries, ...nextEntries]);
    setHasNextPage(body.has_next_page || false);
    setNextCursor(body.next_page_token || "");
  }

  const patchedEntries = entries.map((entry: EntryPreview) => {
    if (patches?.[entry.id]) {
      return { ...entry, preview: entryPreview(patches?.[entry.id]?.text) }
    }
    return entry;
  });

  return children({
    entries: patchedEntries,
    isEntriesLoading,
    onClickNew,
    onClickMore,
    showNextButton: hasNextPage,
  });
}
