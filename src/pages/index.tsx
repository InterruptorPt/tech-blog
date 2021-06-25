import { useTranslation } from 'next-i18next'

import { enhanceStaticProps } from 'utils/next/enhanceStaticProps'

export const getStaticProps = enhanceStaticProps(async () => ({ props: {} }))

export default function Home() {
  const { t } = useTranslation()

  return <h1>{t('helloWorld')}</h1>
}
