import React from 'react'
import { useRouter } from 'next/dist/client/router'

import { Link } from 'components/Link'

export const LocaleChanger: React.FC = () => {
  const router = useRouter()

  return (
    <>
      {router.locales?.map((locale) => {
        if (locale === router.locale) return null

        return (
          <Link
            key={locale}
            href={router.asPath}
            locale={locale}
            className="uppercase font-display text-base"
          >
            {locale}
          </Link>
        )
      })}
    </>
  )
}
