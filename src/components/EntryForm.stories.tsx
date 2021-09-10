import React from 'react';

import EntryForm from './EntryForm';

export default { title: 'EntryForm' };

export const base = () => {
  return <EntryForm />
}

export const initialValues = () => {
  return <EntryForm initialValues={{text: 'Initialized entry\n\nadf sadf'}} />
}

function handleChange(field: string, value: string) {
  console.log(`${field}: ${value}`);
}

interface HandleSubmit {
  text: string;
}

function handleSubmit({ text }: HandleSubmit) {
  console.log({ text });
}

export const lifeCycleHandlers = () => {
  return <EntryForm onChange={handleChange} onSubmit={handleSubmit} />
}

export const isDisabled = () => {
  return <EntryForm initialValues={{ text: 'Initialized entry\n\nadf sadf' }} isDisabled />
}

export const withActions = () => {
  const actions = <div>actions here!</div>;
  return <EntryForm initialValues={{ text: 'Initialized entry\n\nadf sadf' }} isDisabled actions={actions} />
}
