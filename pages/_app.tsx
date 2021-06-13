import { AppProps } from 'next/app'
import 'semantic-ui-css/semantic.min.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}

export default MyApp
