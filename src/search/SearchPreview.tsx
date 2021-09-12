import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';

interface SearchPreviewProps {
    query: string
    text: string
    id: string
}

function insert(str: string, index: number, value: string) {
    return str.substr(0, index) + value + str.substr(index);
}

const Highlight = styled.span`
    background: yellow;
`;

export default function SearchPreview({ query, text, id }: SearchPreviewProps) {
    const startToken = "%%%";
    const endToken = "%%%";
    // TODO: Handle multiple matches
    const start = text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())
    const end = start + query.length + startToken.length
    let buffer = insert(text, start, startToken);
    buffer = insert(buffer, end, endToken)
    const parts = buffer.split(startToken)
    // TODO: Handle multiple matches... batch by 3? [[before match, match, after match]]
    const result = parts.reduce<React.ReactNode[]>((memo, string, index) => {
        if (index % 2 === 0) {
            return [
                ...memo,
                (<span key={index}>{string}</span>)
            ]
        } else {
            return [
                ...memo,
                (<Highlight key={index}>{string}</Highlight>)
            ];
        }
    }, [])

    return (
        <Link to={`/workspace/${id}`}>
            {result}
            <hr />
        </Link>
    )
}