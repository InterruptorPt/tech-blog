import React from 'react'
import { useTranslation } from 'next-i18next'

import { Link } from 'components/Link'
import { BlogPageProps } from 'views/BlogPage'

export type HomePageProps = {
  posts: {
    data: BlogPageProps['frontMatter']
    slug: string
  }[]
}

export const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t('helloWorld')}</h1>

      <ul>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <h2>{post.data.title}</h2>
                <p>{post.data.description}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
