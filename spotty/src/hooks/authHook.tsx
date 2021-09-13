import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '../services/api';


interface Credentials {
    email: string
    password: string
}

interface User {
    name: string
    email: string
    id:string
}
interface RefreshToken {
    expiresIn: number
    user_id: string
}

interface AuthState {
    user: User
    refreshToken: RefreshToken
    token: string
}

interface AuthContextData {
    user: User
    refreshToken:RefreshToken
    loading: boolean
    signIn(credentials: Credentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthHook: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void> {


            const [token, user, refreshToken] = await AsyncStorage.multiGet([
                '@Spotty:token',
                '@Spotty:user',
                '@Spotty:refreshToken'
            ]);

            if (token[1] && user[1] && refreshToken[1]) {
                api.defaults.headers.authorization = `Bearer ${token[1]}`;

                setData({
                    token: token[1],
                    user: JSON.parse(user[1]),
                    refreshToken: JSON.parse(refreshToken[1])
                });
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    const signIn = useCallback(async ({ email, password }: Credentials) => {

        const response = await api.post<AuthState>('/auth', { email, password });
        const { token, user, refreshToken } = response.data;

        await AsyncStorage.multiSet([
            ['@Spotty:token', token],
            ['@Spotty:user', JSON.stringify(user)],
            ['@Spotty:refreshToken', JSON.stringify(refreshToken)],
        ]);

        setData({ token, user, refreshToken });
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@Spotty:user', '@Spotty:token','@Spotty:refreshToken']);

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user: data.user, refreshToken:data.refreshToken ,loading, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
export { AuthHook, useAuth };