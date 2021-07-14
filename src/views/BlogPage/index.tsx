import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { SEO } from 'components/SEO'
import { useDateFormatter } from 'utils/dates/useDateFormatter'

export type BlogPageProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: Partial<{
    title: string
    description: string
    author: string
    translator: string
    date: string
    image: string
    imageAlt: string
  }>
}

export const BlogPage: React.FC<BlogPageProps> = ({ source, frontMatter }) => {
  const { t } = useTranslation()
  const formatDate = useDateFormatter({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const {
    date,
    title,
    description,
    image,
    imageAlt = '',
    translator,
    author,
  } = frontMatter

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
          <Image
            src={image}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            sizes="600px"
          />
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
            <time
              dateTime={date}
              className="block my-4 text-sm font-display font-bold text-violet-600 dark:text-lime"
            >
              {formatDate(date)}
            </time>
          )}
          {author && (
            <p className="text-sm font-display">
              <span className="mr-1">
                {t('post.header.author', { author })}
              </span>

              {translator && (
                <span>({t('post.header.translator', { translator })})</span>
              )}
            </p>
          )}
        </header>
        <MDXRemote {...source} />
      </article>
    </>
  )
}
