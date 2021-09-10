import React from 'react';
import styled from '@emotion/styled';
import { useForm, useField } from 'react-final-form-hooks'

import noop from '../utils/noop';

interface FormValues {
  text: string;
}

interface EntryFormProps {
  initialValues?: FormValues
  onChange?: (field: string, value: string) => void;
  onSubmit?: (arg0: FormValues) => void;
  isDisabled?: boolean;
  actions?: React.ReactNode;
}

const Textarea = styled.textarea`
  height: 80vh;
  width: 100%;
  padding: 10px;
  border: 0;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function EntryForm({ initialValues, onChange, onSubmit, isDisabled, actions }: EntryFormProps) {
  const { form, pristine, handleSubmit } = useForm({
    onSubmit: onSubmit || noop,
    initialValues,
  });

  const textField = useField('text', form);

  function handleChangeTextField(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (onChange) onChange(event.target.name, event.target.value);
    textField.input.onChange(event);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        rows={10}
        name={textField.input.name}
        value={textField.input.value}
        onBlur={textField.input.onBlur}
        onFocus={textField.input.onFocus}
        onChange={handleChangeTextField}
      />
      <ActionsContainer>
        <button type="submit" disabled={isDisabled || pristine}>save</button>
        {actions}
      </ActionsContainer>
    </form>
  );
}
