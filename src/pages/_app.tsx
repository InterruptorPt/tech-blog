import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'

import { Layout } from 'components/Layout'

import 'tailwindcss/tailwind.css'
import 'styles/main.scss'
import '@fontsource/lora/variable.css'
import '@fontsource/lora/variable-italic.css'
import '@fontsource/manrope/variable.css'
import 'styles/prism-theme.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {process.env.NODE_ENV === 'production' && (
          <script src="/js/script.js" data-domain="tech.interruptor.pt" defer />
        )}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default appWithTranslation(MyApp)
