import React from 'react';
import styled from '@emotion/styled';
import { useHotkeys } from "react-hotkeys-hook";
import ReactMarkdown from 'react-markdown';
import useLocalStorage from '../utils/useLocalStorage';
import gfm from 'remark-gfm'

import EntryForm from '../components/EntryForm';
import SaveStatusIndicator, { Variant as SaveStatusIndicatorVariant } from '../components/SaveStatusIndicator';
import DeleteEntry from '../components/DeleteEntry';

interface EntryEditorExperienceProps {
  entryFormInitialValues?: {
    text: string;
  },
  isEntryFormDisabled: boolean;
  saveStatusIndicatorVariant: SaveStatusIndicatorVariant;
  onSubmitEntryForm: (arg0: { text: string }) => void;
  onChangeEntryForm: (field: string, value: string) => void;
  entryCreatedAt: string;
  entryUpdatedAt?: string;
  onClickConfirmDeleteEntry: () => void;
  preview: string;
}

const MetadataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const TimestampContainer = styled.div`
  color: ${props => props.theme.typography.colors.secondary};
`;

const EntryContainer = styled.div`
  display: flex;
`;

const EntryContainerPanel = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    padding: 0 20px;
    overflow: scroll;
    height: 100vh;
`;

function formatDate(locale: string, dateTime?: string, ) {
  if (!dateTime) return '';
  const date = new Date(dateTime)
  const dateFormat = new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
  })
  return dateFormat.format(date)
}

interface MarkdownPreivewProps {
  preview: string
}

function MarkdownPreview({ preview }: MarkdownPreivewProps) {
  return (
    <EntryContainerPanel>
      <ReactMarkdown remarkPlugins={[gfm]}>{preview}</ReactMarkdown>
    </EntryContainerPanel>
  );
}

interface FormProps {
  entryFormInitialValues ?: {
    text: string;
  },
  onSubmitEntryForm: (arg0: { text: string }) => void;
  isEntryFormDisabled: boolean;
  onChangeEntryForm: (field: string, value: string) => void;
  onClickConfirmDeleteEntry: () => void;
}

function Form(props: FormProps) {
  return (
    <EntryContainerPanel>
      <EntryForm
        initialValues={props.entryFormInitialValues}
        onSubmit={props.onSubmitEntryForm}
        isDisabled={props.isEntryFormDisabled}
        onChange={props.onChangeEntryForm}
        actions={<DeleteEntry onConfirmDelete={props.onClickConfirmDeleteEntry} />}
      />
    </EntryContainerPanel>
  )
}

export default function EntryEditorExperience({ entryFormInitialValues, isEntryFormDisabled, saveStatusIndicatorVariant, onSubmitEntryForm, onChangeEntryForm, onClickConfirmDeleteEntry, entryCreatedAt, entryUpdatedAt, preview }: EntryEditorExperienceProps) {
  const [showPreview, setShowPreview] = useLocalStorage<boolean>('EntryEditorExperience:showPreview', true);
  const [showForm, setShowForm] = useLocalStorage<boolean>('EntryEditorExperience:showForm', true);

  function handleToggleShowPreview() {
    setShowPreview(showPreview => !showPreview);
  }

  function handleToggleShowForm() {
    setShowForm(showForm => !showForm);
  }

  useHotkeys('command+shift+p', handleToggleShowPreview, [showPreview])
  useHotkeys('command+shift+e', handleToggleShowForm, [showForm])
  
  return (
    <>
      <MetadataContainer>
        <div>
          <SaveStatusIndicator variant={saveStatusIndicatorVariant} />
        </div>
        <TimestampContainer>
          {formatDate('en-US', entryCreatedAt)} {entryUpdatedAt ? `• ${formatDate('en-US', entryUpdatedAt)}` : null}
        </TimestampContainer>
      </MetadataContainer>
      <EntryContainer>
        {showForm ? <Form
          entryFormInitialValues={entryFormInitialValues}
          onSubmitEntryForm={onSubmitEntryForm}
          isEntryFormDisabled={isEntryFormDisabled}
          onChangeEntryForm={onChangeEntryForm}
          onClickConfirmDeleteEntry={onClickConfirmDeleteEntry}
          /> 
          : null}
        {showPreview ? <MarkdownPreview preview={preview} /> : null}
      </EntryContainer>
      <button onClick={handleToggleShowPreview}>show preview</button>
      <button onClick={handleToggleShowForm}>show form</button>
    </>
  );
}
