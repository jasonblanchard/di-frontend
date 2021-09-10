import React from 'react';
import { useHotkeys } from "react-hotkeys-hook";

import EntryList from '../components/EntriesList';

interface Entry {
  id: string;
  preview: string;
}

interface EntryListExperienceProps {
  entries: Entry[];
  onClickNew: () => void;
  onClickMore: () => void;
  showNextButton: boolean;
}

export default function EntryListExperience({ entries, onClickNew, onClickMore, showNextButton }: EntryListExperienceProps) {
  useHotkeys('shift+n', () => {
    onClickNew()
  })

  return (
    <>
      <button onClick={onClickNew}>new</button>
      <EntryList entries={entries} />
      {showNextButton ? <button onClick={onClickMore}>more</button> : null}
    </>
  );
}
