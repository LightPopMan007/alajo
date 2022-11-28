import { signOut } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
    const router = useRouter();
    React.useEffect(() => {
        signOut({
            callbackUrl: `/`
        })
            .then(() => {
                router.push('/');
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    return <></>;
}