import { useTranslation } from 'next-i18next'

const Custom500: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container p-4">
      <h1 className="text-xl md:text-4xl mb-4 md:mb-12 leading-tight text-center">
        {t('error.500')}
      </h1>
      <img
        className="w-full h-40"
        src="/images/undraw_server_down.svg"
        alt=""
      />
    </div>
  )
}

export default Custom500
