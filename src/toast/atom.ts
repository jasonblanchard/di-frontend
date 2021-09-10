import { ReactNode } from 'react';
import { atom } from 'recoil';

interface ToastState {
    body: ReactNode
}

const toastState = atom<ToastState | null>({
    key: 'toastState',
    default: null,
})

export default toastState;