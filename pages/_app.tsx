import '../styles/globals.css';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  ) 
}

export default MyApp
