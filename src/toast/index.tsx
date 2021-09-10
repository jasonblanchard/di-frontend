import React from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';

import toastState from './atom';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: ${props => props.theme.typography.colors.success};
`;

export default function Toast() {
    const [toast, setToastText] = useRecoilState(toastState);

    function handleDismiss() {
        setToastText(null);
    }

    if (!toast) return null;

    return (
        <Wrapper>
            <div>
                {toast.body}
            </div>
            <button onClick={handleDismiss}>x</button>
        </Wrapper>
    )
}