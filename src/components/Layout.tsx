import React from 'react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { MDXProvider } from '@mdx-js/react'
import clsx from 'clsx'

import { Link } from './Link'
import { LocaleChanger } from './LocaleChanger'
import { ThemeToggle } from './ThemeToggle'

const components = {
  img: Image,
  a: Link,
}

export const Layout: React.FC = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  const homepageLink = (
    <Link
      href="/"
      className={clsx(
        'flex font-normal items-center',
        'space-x-2',
        'font-display text-2xl text-violet-700 dark:text-violet-200',
        '!bg-none origin-top-left',
        { 'scale-75': !isHomePage },
      )}
    >
      <span>
        <img
          className="inline dark:hidden h-10"
          src="/logo-purple.svg"
          alt={t('site.title.logoAlt')}
        />
        <img
          className="hidden dark:inline h-10"
          src="/logo-yellow.svg"
          alt={t('site.title.logoAlt')}
        />
      </span>
      <span>{t('site.title.tech')}</span>
    </Link>
  )

  return (
    <>
      <header
        className={clsx(
          'flex justify-between',
          'w-full max-w-screen-sm',
          'mx-auto my-8 px-4 space-x-2',
        )}
      >
        {isHomePage ? <h1>{homepageLink}</h1> : homepageLink}
        <div className="flex items-center space-x-2">
          <LocaleChanger />
          <ThemeToggle />
        </div>
      </header>
      <MDXProvider components={components}>
        <main
          className="flex-grow w-full max-w-screen-sm mx-auto px-4"
          {...props}
        />
      </MDXProvider>
    </>
  )
}
