import React, { useState } from 'react';
import { useHotkeys } from "react-hotkeys-hook";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import SideDrawerLayout from './SideDrawerLayout';
import EntryEditorExperience from '../entryEditor/EntryEditorExperience';
import EntryListExperience from '../entryList/EntryListExperience';
import EntryListExperienceConnector from '../entryList/EntryListExperienceConnector';
import EntryEditorExperienceConnector from '../entryEditor/EntryEditorExperienceConnector';
import useLocalStorage from '../utils/useLocalStorage'

interface EntryPatch {
  [key: string]: {
    text: string
  }
}

export default function EntryEditorPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage<boolean>('SideDrawerLayout:isCollapsed', true);
  const history = useHistory();

  interface Params {
    entryId: string
  }

  const { entryId } = useParams<Params>();
  const [entryPatches, setEntryPatches] = useState<EntryPatch>();

  const handleToggleCollapse = () => setIsSidebarCollapsed(isSidebarCollapsed => !isSidebarCollapsed);

  useHotkeys('command+\\', handleToggleCollapse, [isSidebarCollapsed])
  useHotkeys('command+shift+f', () => {
    history.push("/search/")
  })

  function handleChangeEntry(id: string, _field: string, value: string) {
    setEntryPatches((patches) => {
      return {
        ...patches,
        ...{
          [id]: {
            text: value
          }
        }
      }
    });
  }

  return (
    <SideDrawerLayout isSidebarCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleCollapse}>
      <EntryListExperienceConnector patches={entryPatches}>
        {({ isEntriesLoading, onClickNew, ...rest }) => {
          if (isSidebarCollapsed) {
            return (
              <nav>
                <button onClick={onClickNew}>+</button>
              </nav>
            )
          }

          return (
            <nav>
              {isEntriesLoading ? <div>loading...</div> : <EntryListExperience onClickNew={onClickNew} {...rest} />}
            </nav>
          );
        }}
      </EntryListExperienceConnector>
      <div role="main">
        <EntryEditorExperienceConnector selectedEntryId={entryId} onChangeEntry={handleChangeEntry}>
          {({ isLoadingEntry, entryFormInitialValues, ...rest }) => {
            const preview = entryPatches?.[entryId]?.text || entryFormInitialValues?.text || "";
            return isLoadingEntry ? <div>loading...</div> : <EntryEditorExperience preview={preview} entryFormInitialValues={entryFormInitialValues} {...rest} />
          }}
        </EntryEditorExperienceConnector>
      </div>
    </SideDrawerLayout>
  )
}
