import React from 'react';

import DeleteEntry from './DeleteEntry';

export default { title: 'DeleteEntry' };

function handleConfirmDelete() {
  console.log('clicked');
}

export const base = () => {
  return <DeleteEntry onConfirmDelete={handleConfirmDelete} />
}
