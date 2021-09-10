import React from 'react';

import EntriesList from './EntriesList';

export default { title: 'EntriesList' };

const entries = [
  {
    id: '1',
    preview: 'first entry',
  },
  {
    id: '2',
    preview: 'second entry',
  },
  {
    id: '3',
    preview: 'third entry',
  }
]

export const base = () => {
  return <EntriesList entries={entries} />
}

export const zeroState = () => {
  return <EntriesList entries={[]} />
}
