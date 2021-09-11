import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import debounce from 'lodash.debounce';
import { NotebookClient } from "@jasonblanchard/di-apis"
import { useRecoilState, useRecoilValue } from 'recoil';
import { idTokenState } from '../auth/state';

import { Variant as SaveStatusIndicatorVariant } from '../components/SaveStatusIndicator';
import toastState from '../toast/atom';
import DeleteEntryModal from '../components/DeleteEntryModal';

interface EntryEditorExperienceConnectorProps {
  children: (arg0: EntryEditorExperienceConnectorRenderProps) => React.ReactElement;
  selectedEntryId?: string;
  onChangeEntry?: (id: string, field: string, value: string) => void;
}

export interface EntryEditorExperienceConnectorRenderProps {
  isLoadingEntry: boolean;
  entryFormInitialValues?: {
    text: string;
  },
  isEntryFormDisabled: boolean;
  saveStatusIndicatorVariant: SaveStatusIndicatorVariant;
  entryCreatedAt: string;
  entryUpdatedAt?: string;
  onSubmitEntryForm: (arg0: { text: string }) => void;
  onChangeEntryForm: (field: string, value: string) => void;
  onClickConfirmDeleteEntry: () => void;
}

interface Entry {
  text: string;
  createdAt: string;
  updatedAt?: string;
}

function mapSaveStateToSaveStatusIndicatorVariant(isSavingEntry: boolean, didSaveEntryFail: boolean) {
  if (didSaveEntryFail) return SaveStatusIndicatorVariant.Error;
  if (isSavingEntry) return SaveStatusIndicatorVariant.Saving;
  return SaveStatusIndicatorVariant.Saved;
}

export default function EntryEditorExperienceConnector({ children, selectedEntryId, onChangeEntry }: EntryEditorExperienceConnectorProps) {
  const [entry, setEntry] = useState<Entry>();
  const [isLoadingEntry, setIsLoadingEntry] = useState(false);
  const [isSavingEntry, setIsSavingEntry] = useState(false);
  const [didSaveEntryFail, setDidSaveEntryFiled] = useState(false);
  // const [debouncedSaveEntry, setDebouncedSaveEntry] = useState<(({ text }: { text: string; }) => Promise<void>)>();
  const [debouncedSaveEntry, setDebouncedSaveEntry] = useState<any>();
  const [, setToastText] = useRecoilState(toastState) 
  const idToken = useRecoilValue(idTokenState);

  const path = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" : ""}${window.location.port ? window.location.port : ""}/api`
  const notebookClient = new NotebookClient(path)
  notebookClient.setRequestHeadersHandler(headers => ({
    ...headers,
    'Authorization': `Bearer ${idToken}`,
  }));

  const history = useHistory();

  useEffect(() => {
    async function fetchEntry() {
      if (!selectedEntryId) return;
      setIsLoadingEntry(true);
      const { body: entryResponse } = await notebookClient.Notebook_GetEntry({ id: selectedEntryId })
      const entry = {
        text: entryResponse.text,
        creatorId: entryResponse.creator_id,
        createdAt: entryResponse.created_at,
        updatedAt: entryResponse.updated_at,
      }
      setEntry(entry);
      setIsLoadingEntry(false);
    }
    fetchEntry();
  }, [selectedEntryId]);

  async function saveEntry({ text }: { text: string }) {
    setDidSaveEntryFiled(false);
    setIsSavingEntry(true);
    try {
      await notebookClient.Notebook_UpdateEntry({
        id: selectedEntryId || "",
        body: {
          text
        }
      })
      setIsSavingEntry(false);
      // setEntry(entry);
    } catch (error) {
      console.error(error);
      setIsSavingEntry(false);
      setDidSaveEntryFiled(true);
    }
  }

  // Only create the debounced save on first render.
  useEffect(() => {
    const debouncedSaveEntry = debounce(saveEntry, 1000, { maxWait: 10000 });
    // Need to use function syntax, otherwise the setter tries to immediately invoke it.
    setDebouncedSaveEntry(() => debouncedSaveEntry);
  }, [selectedEntryId]);

  async function undeleteEntry() {
    const id = selectedEntryId || "";
    await notebookClient.Notebook_UndeleteEntry({ id });
    history.push(`/workspace/${id}`);
    setToastText({
      body: <div>Restored post</div>
    });
  }

  async function deleteEntry() {
    await notebookClient.Notebook_DeleteEntry({ id: selectedEntryId || "" })
    setToastText({ body: <DeleteEntryModal id={selectedEntryId} onClickUndo={undeleteEntry} /> })
    history.push(`/workspace/`);
  }

  function handleChangeEntryForm(field: string, value: string) {
    if (selectedEntryId && onChangeEntry) onChangeEntry(selectedEntryId, field, value);
    if (!debouncedSaveEntry) return;
    if (field === 'text') debouncedSaveEntry({ text: value });
  }

  // TODO: Artificially slow down the transition from saving to saved to make it more noticeable.
  const saveStatusIndicatorVariant = mapSaveStateToSaveStatusIndicatorVariant(isSavingEntry, didSaveEntryFail);

  return children({
    isEntryFormDisabled: false,
    saveStatusIndicatorVariant,
    onSubmitEntryForm: saveEntry,
    onChangeEntryForm: handleChangeEntryForm,
    isLoadingEntry: isLoadingEntry,
    entryFormInitialValues: {
      text: entry?.text || ''
    },
    entryCreatedAt: entry?.createdAt || '',
    entryUpdatedAt: entry?.updatedAt,
    onClickConfirmDeleteEntry: deleteEntry,
  });
}
