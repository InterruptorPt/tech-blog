import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'querystring'

export function withStaticI18n<
  TProps extends { [key: string]: any } = { [key: string]: any },
  TQuery extends ParsedUrlQuery = ParsedUrlQuery,
>(
  getStaticPropsFn: GetStaticProps<TProps, TQuery>,
): GetStaticProps<TProps, TQuery> {
  return async (context) => {
    const i18n = await serverSideTranslations(context.locale || 'pt')

    const result = await getStaticPropsFn(context)

    if (!('props' in result)) return result

    return { ...result, props: { ...result.props, ...i18n } }
  }
}
