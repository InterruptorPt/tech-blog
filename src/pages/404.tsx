import { useTranslation } from 'next-i18next'

import { enhanceStaticProps } from 'utils/next/enhanceStaticProps'

export const getStaticProps = enhanceStaticProps(async () => ({ props: {} }))

const Custom404: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container p-4">
      <h1 className="mb-4 md:mb-12 text-xl md:text-4xl leading-tight text-center">
        {t('error.404')}
      </h1>
      <img
        className="object-contain w-full"
        src="/images/undraw_page_not_found_hiding.svg"
        alt=""
      />
    </div>
  )
}

export default Custom404
