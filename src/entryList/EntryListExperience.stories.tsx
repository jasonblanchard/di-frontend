import React from 'react';

import EntryListExperience from './EntryListExperience';
import noop from '../utils/noop';

export default { title: 'EntryListExperience' };

const entries = [
  {
    id: '1',
    preview: 'first'
  },
  {
    id: '1',
    preview: 'second'
  }
]

export const base = () => {
  return (
    <EntryListExperience entries={entries} onClickNew={noop} onClickMore={noop} showNextButton />
  )
}
