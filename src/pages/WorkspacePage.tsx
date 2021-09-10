import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";

import BaseLayout from './BaseLayout';
import EntryListExperience from '../entryList/EntryListExperience';
import EntryListExperienceConnector from '../entryList/EntryListExperienceConnector';

const ListContainer = styled.div`
  padding: 10px;
`;

export default function WorkspacePage() {
  const history = useHistory();
  useHotkeys('command+shift+f', () => {
    history.push("/search/")
  })

  return (
    <BaseLayout>
      <EntryListExperienceConnector>
        {({ isEntriesLoading, ...rest }) => {
          return isEntriesLoading ? <div>loading...</div> : <ListContainer><EntryListExperience {...rest} /></ListContainer>;
        }}
      </EntryListExperienceConnector>
    </BaseLayout>
  )
}
