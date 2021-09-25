import { AppProps } from 'next/app'
import { Router } from 'next/router'
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react'

import App from 'pages/_app'

export const render = (
  ui: React.ReactElement,
  options?: RenderOptions,
): RenderResult => {
  const appProps = {
    Component: () => ui,
    pageProps: {},
    router: {} as Router,
  } as AppProps

  return rtlRender(<App {...appProps} />, options)
}
