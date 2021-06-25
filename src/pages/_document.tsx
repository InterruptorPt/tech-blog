import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html className="dark">
        <Head>
          <link rel="preconnect" href="https://images.prismic.io" />
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
          <link
            rel="preload"
            href="/fonts/Manrope/Manrope-VariableFont_wght.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Lora/Lora-VariableFont_wght.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#7972AB" />
          <meta name="color-scheme" content="dark light" />
        </Head>
        <body className="bg-white text-black dark:bg-violet-900 dark:text-white">
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
