import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import clsx from 'clsx'

import { Link } from 'components/Link'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer
      className={clsx(
        'flex flex-col items-center p-4 md:py-8 mt-6',
        'bg-black text-white font-display',
      )}
    >
      <Link href="https://www.interruptor.pt">
        <Image
          src="/logo-white.svg"
          alt="Interruptor"
          height={35}
          width={180}
          objectFit="contain"
        />
      </Link>

      <div>
        <p className="mb-2">{t('footer.licence.description')}</p>
        <Link
          href={t('footer.licence.link')}
          className="flex flex-row justify-center"
          title={t('footer.licence.title')}
          isExternal
        >
          {['cc', 'cc-by', 'cc-sa'].map((part) => (
            <span key={part} className="mx-px">
              <Image
                src={`/icons/cc/white/${part}.svg`}
                alt=""
                height={24}
                width={24}
              />
            </span>
          ))}
          <p className="sr-only">{t('footer.licence.title')}</p>
        </Link>
      </div>
    </footer>
  )
}
