import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { useDateFormatter } from 'utils/dates/useDateFormatter'

export type BlogPageProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: {
    title?: string
    description?: string
    author?: string
    date?: string
  }
}

export const BlogPage: React.FC<BlogPageProps> = ({ source, frontMatter }) => {
  const formatDate = useDateFormatter({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const { date, title } = frontMatter

  return (
    <article
      className="prose md:prose-md lg:prose-lg dark:prose-dark mx-auto"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h1
          className="inline chunky-underline-violet-100 dark:chunky-underline-violet-600"
          itemProp="headline"
        >
          {title}
        </h1>
        {date && (
          <p className="text-sm font-semibold text-primary-800 dark:text-primary-200">
            {formatDate(date)}
          </p>
        )}
      </header>
      <MDXRemote {...source} />
    </article>
  )
}
