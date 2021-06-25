import React from 'react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { MDXProvider } from '@mdx-js/react'

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

  const homepageLink = (
    <Link
      href="/"
      className="font-display font-black text-primary-800 dark:text-primary-200 !bg-none"
    >
      {t('site.title')}
    </Link>
  )

  return (
    <>
      <header className="flex justify-between w-full max-w-screen-sm mx-auto my-8 text-2xl space-x-2">
        {router.basePath === '/' ? <h1>{homepageLink}</h1> : homepageLink}
        <div className="flex items-center space-x-2">
          <LocaleChanger />
          <ThemeToggle />
        </div>
      </header>
      <MDXProvider components={components}>
        <main className="flex-grow w-full max-w-screen-sm mx-auto" {...props} />
      </MDXProvider>
    </>
  )
}
