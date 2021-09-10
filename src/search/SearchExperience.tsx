import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import { useForm, useField } from 'react-final-form-hooks'
import { useQueryParam, StringParam } from 'use-query-params';
import { useHotkeys } from "react-hotkeys-hook";

import SearchPreview from './SearchPreview';

const Container = styled.div`
    margin: 10px;
`;

interface Entry {
    id: string
    text: string
}

interface SearchExperienceProps {
    entries?: Entry[]
    onClickMore: () => void
    showSearchMoreButton: boolean
}

export default function SearchExperience({ entries, onClickMore, showSearchMoreButton }: SearchExperienceProps) {
    const [queryParam, setQueryParam] = useQueryParam('q', StringParam);

    const { form } = useForm({
        onSubmit: () => {},
        initialValues: {
            query: queryParam,
        }
    });
    const textInput = useRef<HTMLInputElement>(null);

    const queryField = useField('query', form);

    let results: Entry[] = [];
    if (entries && queryField.input.value) {
        results = entries.filter((entry: Entry) => entry.text.toLocaleLowerCase().includes(queryField.input.value.toLocaleLowerCase()))
    }

    useEffect(() => {
        if (textInput.current != null) {
            textInput.current.focus();
        }
    }, [textInput])

    useHotkeys('esc', () => {
        form.reset({
            query: "",
        })
        setQueryParam("")
    }, [textInput])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setQueryParam(event.target.value)
        queryField.input.onChange(event)
    }

    return (
        <Container>
            <input
                name={queryField.input.name}
                value={queryField.input.value}
                onChange={handleChange}
                placeholder="search"
                ref={textInput}
            />
            {results.map((entry: Entry) => <div key={entry.id}><SearchPreview query={queryField.input.value} text={entry.text} id={entry.id} /></div>)}
            {showSearchMoreButton && <button onClick={onClickMore}>keep searching</button>}
        </Container>
    )
}