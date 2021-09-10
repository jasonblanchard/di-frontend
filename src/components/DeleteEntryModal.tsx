import React from 'react';

interface DeleteEntryModaProps {
    id?: string
    onClickUndo: () => void
}

export default function DeleteEntryModal({ id, onClickUndo }: DeleteEntryModaProps) {
    return (
        <div>Successfully deleted {id} <button onClick={onClickUndo}>undo</button></div>
    )
}