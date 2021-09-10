import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledLink = styled(Link)`
    display: block;
    border-bottom: 1px solid #efefef;
    padding: 7px 4px 7px 4px;
`

interface Entry {
  id: string;
  preview: string;
}

interface EntriesListProps {
  entries: Entry[];
}

interface EntryListItemProps {
  entry: Entry
}

function EntryListItem({ entry }: EntryListItemProps) {
  return (
    <li>
      <StyledLink to={`/workspace/${entry.id}`}>{entry.preview}</StyledLink>
    </li>
  );
}

export default function EntriesList({ entries }: EntriesListProps) {
  if (entries.length === 0) {
    return <div>No entries yet</div>;
  }

  return (
    <Ul>
      {entries.map(entry => <EntryListItem key={entry.id} entry={entry} />)}
    </Ul>
  );
}
