import { GetStaticPaths } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs/promises'
import prism from 'remark-prism'

import { BLOG_FILES_FOLDER, readPostMarkdown } from 'utils/blog'
import { enhanceStaticProps } from 'utils/next/enhanceStaticProps'
import { BlogPage, BlogPageProps } from 'views/BlogPage'

type BlogPagePathParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<BlogPagePathParams> = async ({
  defaultLocale = 'pt',
  locales = [defaultLocale],
}) => {
  const files = await fs.readdir(BLOG_FILES_FOLDER, { withFileTypes: true })
  const paths = files.flatMap(({ name }) => {
    const [slug] = name.split('.')

    return locales.map((locale) => ({
      params: { slug },
      locale,
    }))
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = enhanceStaticProps<
  BlogPageProps,
  BlogPagePathParams
>(async ({ params, locale }) => {
  const slug = params?.slug

  const markdown = locale && slug && (await readPostMarkdown({ locale, slug }))

  if (!markdown) {
    return { notFound: true }
  }

  const { content, data } = markdown
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: { remarkPlugins: [prism] },
  })

  return { props: { source: mdxSource, frontMatter: data } }
})

export default BlogPage
