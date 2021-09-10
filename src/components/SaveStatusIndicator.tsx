import React from 'react';
import styled from '@emotion/styled';

export enum Variant {
  Saved,
  Saving,
  Error
}

interface SaveStatusIndicatorProps {
  variant: Variant;
}

function variantToProps(variant: Variant) {
  switch (variant) {
    case (Variant.Saved):
      return { color: 'green', text: 'Saved' };
    case (Variant.Saving):
      return { color: 'yellow', text: 'Saving...' };
    case (Variant.Error):
      return { color: 'red', text: 'Error' };
  }
}

interface SaveContainerProps {
  color: string;
}

const Inner = styled.span`
  color: ${props => props.theme.typography.colors.secondary}
`

const SaveContainer = styled.span<SaveContainerProps>`
  align-items: center;
  display: flex;
  &::before {
    background-color: ${props => props.color};
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 10px;
    margin-right: 3px;
    width: 10px;
  }
`;

export default function SaveStatusIndicator({ variant }: SaveStatusIndicatorProps) {
  const { text, color } = variantToProps(variant);
  return (
    <SaveContainer color={color}>
      <Inner>{text}</Inner>
    </SaveContainer>
  );
}
