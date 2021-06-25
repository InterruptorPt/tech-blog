import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { withStaticI18n } from 'i18n'

export function enhanceStaticProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
>(
  getStaticProps: GetStaticProps<P, Q>,
  { withI18n = true } = {},
): GetStaticProps<P, Q> {
  return async (context) => {
    let runGetStaticProps: GetStaticProps<P, Q> = getStaticProps

    if (withI18n) {
      runGetStaticProps = withStaticI18n(runGetStaticProps)
    }

    return runGetStaticProps(context)
  }
}
