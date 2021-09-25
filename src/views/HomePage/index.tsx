import React from 'react'
import { NextPage } from 'next'

import { Link } from 'components/Link'
import { useDateFormatter } from 'utils/dates/useDateFormatter'
import { BlogPostProps } from 'views/BlogPost'

export type HomePageProps = {
  posts: {
    data: BlogPostProps['frontMatter']
    slug: string
  }[]
}

export const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  const formatDate = useDateFormatter({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <ul className="my-4 md:my-8 mx-auto space-y-8 max-w-screen-sm list-none">
        {posts.map((post) => {
          const { title, date, description } = post.data

          return (
            <li key={post.slug} data-testid={post.slug}>
              <article
                className="space-y-2"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header className="space-y-2">
                  <h2 className="inline text-xl md:text-2xl font-bold">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="chunky-underline-violet-200 dark:chunky-underline-violet-600"
                      itemProp="url"
                    >
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  {date && (
                    <small className="block font-display text-xs font-semibold text-violet-700 dark:text-lime">
                      {formatDate(date)}
                    </small>
                  )}
                </header>
                <section>
                  <p itemProp="description">{description}</p>
                </section>
              </article>
            </li>
          )
        })}
      </ul>
    </>
  )
}
