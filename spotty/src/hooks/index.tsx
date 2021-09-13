import React from 'react';
import { AuthHook } from './authHook';

const Hooks: React.FC = ({ children }) => {
    return (
        <AuthHook>{children}</AuthHook>
    );
}

export default Hooks;