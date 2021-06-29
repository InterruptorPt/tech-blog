import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import clsx from 'clsx'

import { Link } from 'components/Link'
import { siteConfig } from 'utils/config/site'
import { useSocialLinks } from 'utils/hooks/useSocialLinks'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  const socialLinks = useSocialLinks()

  return (
    <footer
      className={clsx(
        'flex flex-col items-center py-8 mt-8 md:mt-12 space-y-4',
        'bg-black text-white font-display',
      )}
    >
      <Link href={siteConfig.mainSiteURL}>
        <Image
          src="/logo-white.svg"
          alt={siteConfig.title}
          height={35}
          width={180}
          objectFit="contain"
        />
      </Link>

      <div>
        <Link
          href={t('footer.licence.link')}
          className="flex flex-row justify-center"
          title={t('footer.licence.title')}
          isExternal
        >
          {siteConfig.licence.iconPaths.map((path) => (
            <span key={path} className="mx-px">
              <Image src={path} alt="" height={24} width={24} />
            </span>
          ))}
          <p className="sr-only">{t('footer.licence.title')}</p>
        </Link>
        <p>{t('footer.licence.description')}</p>
      </div>

      <div className="flex justify-center items-start px-4 space-x-4">
        {socialLinks.map(({ href, text, Icon }) => {
          return (
            <Link key={href} href={href} title={text} isExternal>
              <Icon aria-label={text} strokeWidth="0.1rem" size={24} />
              <span className="sr-only">{text}</span>
            </Link>
          )
        })}
      </div>
    </footer>
  )
}
