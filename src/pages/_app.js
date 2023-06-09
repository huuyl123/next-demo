import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import Layout from './_layout'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )

}
