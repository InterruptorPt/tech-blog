import { useTranslation } from 'next-i18next'

const Custom404: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container p-4">
      <h1 className="text-xl md:text-4xl mb-4 md:mb-12 leading-tight text-center">
        {t('error.404')}
      </h1>
      <img
        className="w-full object-contain"
        src="/images/undraw_page_not_found_hiding.svg"
        alt=""
      />
    </div>
  )
}

export default Custom404
