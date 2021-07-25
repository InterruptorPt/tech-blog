import React from 'react'

import { Link } from 'components/Link'
import { useDateFormatter } from 'utils/dates/useDateFormatter'
import { BlogPostProps } from 'views/BlogPost'

export type HomePageProps = {
  posts: {
    data: BlogPostProps['frontMatter']
    slug: string
  }[]
}

export const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  const formatDate = useDateFormatter({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <ul className="max-w-screen-sm mx-auto list-none my-4 md:my-8 space-y-8">
        {posts.map((post) => {
          const { title, date, description } = post.data

          return (
            <li key={post.slug}>
              <article
                className="space-y-2"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header className="space-y-2">
                  <h2 className="text-xl md:text-2xl font-bold inline">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="chunky-underline-violet-100 dark:chunky-underline-violet-600"
                      itemProp="url"
                    >
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  {date && (
                    <small className="block text-xs font-display font-semibold text-violet-700 dark:text-lime">
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
