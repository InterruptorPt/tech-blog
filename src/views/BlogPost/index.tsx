import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { SEO } from 'components/SEO'
import { useDateFormatter } from 'utils/dates/useDateFormatter'

import { LinksToOtherPosts, PostLink } from './LinksToOtherPosts'

export type BlogPostProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: Partial<{
    title: string
    description: string
    author: string
    translator: string
    date: string
    image: string
    imageAlt: string
    imageCredit: string
  }>
  links: {
    next: PostLink | null
    previous: PostLink | null
  }
}

export const BlogPost: React.FC<BlogPostProps> = ({
  source,
  frontMatter,
  links,
}) => {
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
    imageCredit,
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
        <figure key={image} className="mb-4 md:mb-8">
          <div className="relative pb-9/16">
            <Image
              src={image}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              sizes="600px"
              quality={90}
            />
          </div>
          {!!imageCredit && (
            <figcaption
              className="font-display font-medium text-xs text-right py-1 text-violet-600 dark:text-violet-200"
              dangerouslySetInnerHTML={{ __html: imageCredit }}
            />
          )}
        </figure>
      )}

      <article
        className="prose lg:prose-lg dark:prose-dark mx-auto"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1
            className="inline chunky-underline-violet-200 dark:chunky-underline-violet-600"
            itemProp="headline"
          >
            {title}
          </h1>
          {date && (
            <time
              data-testid="firstPublishedDate"
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

      <nav className="border-t-2 p-4 mt-4 md:mt-8">
        <LinksToOtherPosts previous={links.previous} next={links.next} />
      </nav>
    </>
  )
}
