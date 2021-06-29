import { useTranslation } from 'react-i18next'

import { SEO } from '.'

export const DefaultSEO: React.FC = () => {
  const { t } = useTranslation()

  return <SEO pageTitle={t('site.title.full')} withTitleSuffix={false} />
}
