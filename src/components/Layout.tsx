import React from 'react'
import { useRouter } from 'next/dist/client/router'
import { useTranslation } from 'next-i18next'
import clsx from 'clsx'

import { DefaultSEO } from './SEO/DefaultSEO'
import { CustomMDXProvider } from './CustomMDXProvider'
import { Footer } from './Footer'
import { Link } from './Link'
import { LocaleChanger } from './LocaleChanger'
import { ThemeToggle } from './ThemeToggle'

export const Layout: React.FC = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  const homepageLink = (
    <Link
      href="/"
      className={clsx(
        'flex flex-col items-start',
        'font-display font-normal text-xl text-violet-700 dark:text-violet-200',
        '!bg-none origin-top-left',
        { 'scale-75': !isHomePage },
      )}
    >
      <span>
        <img
          className="inline dark:hidden h-9"
          src="/logo-purple.svg"
          alt={t('site.title.logoAlt')}
        />
        <img
          className="hidden dark:inline h-9"
          src="/logo-yellow.svg"
          alt={t('site.title.logoAlt')}
        />
      </span>
      <span className="-mt-2">{t('site.title.tech')}</span>
    </Link>
  )

  return (
    <>
      <DefaultSEO />
      <header
        className={clsx(
          'flex justify-between items-start',
          'w-full max-w-screen-md',
          'mx-auto my-4 md:my-8 px-4 space-x-4',
        )}
      >
        {isHomePage ? <h1>{homepageLink}</h1> : homepageLink}
        <div className="flex items-center space-x-2">
          <LocaleChanger />
          <ThemeToggle />
        </div>
      </header>
      <CustomMDXProvider>
        <main
          className="flex-grow w-full max-w-screen-md mx-auto px-4"
          {...props}
        />
      </CustomMDXProvider>
      <Footer />
    </>
  )
}
