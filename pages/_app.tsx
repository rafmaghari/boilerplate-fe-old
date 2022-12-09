import { AppType } from 'next/dist/shared/lib/utils'
import '../styles/globals.css'

import { store } from '../store/store'
import { Provider } from 'react-redux'
import {RouteGuard} from "../components/Common/Auth/RouteGuard";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <RouteGuard>
                <Component {...pageProps} />
            </RouteGuard>
        </Provider>
    )
}

export default MyApp
