import React from 'react';

import EntryEditorExperience from './EntryEditorExperience';
import { Variant as SaveStatusIndicatorVariant } from '../components/SaveStatusIndicator';

export default { title: 'EntryEditorExperience' };

function saveEntry({ text }: { text: string}) {
  console.log(`Call update with ${text}`);
}

function handleChangeEntryForm(field: string, value: string) {
  console.log(`Updating ${field} to ${value}`);
}

function handleClickDeleteEntry() {
  console.log('delete');
}

export const base = () => {
  return (
    <EntryEditorExperience
      preview="asdfa"
      isEntryFormDisabled={false}
      saveStatusIndicatorVariant={SaveStatusIndicatorVariant.Saved}
      onSubmitEntryForm={saveEntry}
      onChangeEntryForm={handleChangeEntryForm}
      onClickConfirmDeleteEntry={handleClickDeleteEntry}
      entryCreatedAt="2020-05-19T22:39:38.759Z"
    />
  )
}

export const withUpdatedAt = () => {
  return (
    <EntryEditorExperience
      preview="asdf"
      isEntryFormDisabled={false}
      saveStatusIndicatorVariant={SaveStatusIndicatorVariant.Saved}
      onSubmitEntryForm={saveEntry}
      onChangeEntryForm={handleChangeEntryForm}
      onClickConfirmDeleteEntry={handleClickDeleteEntry}
      entryCreatedAt="2020-05-19T22:39:38.759Z"
      entryUpdatedAt="2020-05-19T22:39:38.759Z"
    />
  )
}
