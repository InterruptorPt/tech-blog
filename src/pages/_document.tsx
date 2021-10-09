import Document, { Head, Html, Main, NextScript } from 'next/document'

import { siteConfig } from 'config/site'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html className="dark">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#7972AB" />
          <meta name="color-scheme" content="dark light" />
          {!!siteConfig.webMonetizationPointer && (
            <meta
              name="monetization"
              content={siteConfig.webMonetizationPointer}
            />
          )}
        </Head>
        <body className="text-black dark:text-white bg-white dark:bg-violet-900">
          <div className="max-w-full">
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
