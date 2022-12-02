import { AppType } from 'next/dist/shared/lib/utils'
import '../styles/globals.css'

import { store } from '../app/store'
import { Provider } from 'react-redux'

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
