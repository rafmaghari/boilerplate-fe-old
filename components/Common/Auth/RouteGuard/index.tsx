import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {IUser} from "../../../../types/User";

export { RouteGuard };

interface IProps {
    children: any
}

function RouteGuard({ children }: IProps) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth) || {}

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath, token);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url: string, token: string | null | true) {
        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ['/login', '/register'];
        const path = url.split('?')[0];
        if (!token && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}