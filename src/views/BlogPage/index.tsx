import Image from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { SEO } from 'components/SEO'
import { useDateFormatter } from 'utils/dates/useDateFormatter'

export type BlogPageProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: Partial<{
    title: string
    description: string
    author: string
    date: string
    image: string
    imageAlt: string
  }>
}

export const BlogPage: React.FC<BlogPageProps> = ({ source, frontMatter }) => {
  const formatDate = useDateFormatter({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const { date, title, description, image, imageAlt = '' } = frontMatter

  return (
    <>
      {title && (
        <SEO
          pageTitle={title}
          description={description}
          image={{ url: image, alt: imageAlt }}
          type="article"
        />
      )}
      {image && (
        <div className="relative flex-shrink-0 w-full pb-9/16 mb-4 md:mb-8">
          <Image src={image} alt={imageAlt} layout="fill" objectFit="cover" />
        </div>
      )}

      <article
        className="prose lg:prose-lg dark:prose-dark mx-auto"
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
            <p className="text-sm font-display font-bold text-primary-800 dark:text-lime">
              {formatDate(date)}
            </p>
          )}
        </header>
        <MDXRemote {...source} />
      </article>
    </>
  )
}
