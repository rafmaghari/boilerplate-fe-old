import { AppType } from 'next/dist/shared/lib/utils'
import '../styles/globals.css'

import { store } from '../store/store'
import { Provider } from 'react-redux'
import {RouteGuard} from "../components/Common/Auth/RouteGuard";
import {SessionProvider} from "next-auth/react";
import {AppProps} from "next/app";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
    return (
        <SessionProvider session={pageProps.session}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SessionProvider>
    )
}

export default MyApp
