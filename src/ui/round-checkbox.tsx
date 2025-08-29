import React from 'react';
import '../App.css';

interface RoundCheckboxProps {
    checked: boolean;
    onChange: () => void;
}

export const RoundCheckbox: React.FC<RoundCheckboxProps> = ({ checked, onChange }) => {
    return (
        <label className="round-checkbox">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="checkmark" />
        </label>
    );
};