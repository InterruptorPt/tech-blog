import { GetStaticPaths } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs/promises'
import prism from 'remark-prism'

import {
  BLOG_FILES_FOLDER,
  loadAllPostsByLocale,
  readPostMarkdown,
} from 'utils/blog'
import { enhanceStaticProps } from 'utils/next/enhanceStaticProps'
import { BlogPost, BlogPostProps } from 'views/BlogPost'

type BlogPostPathParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<BlogPostPathParams> = async ({
  defaultLocale = 'pt',
  locales = [defaultLocale],
}) => {
  const files = await fs.readdir(BLOG_FILES_FOLDER)
  const paths = files.flatMap((slug) => {
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
  BlogPostProps,
  BlogPostPathParams
>(async ({ params, locale = 'pt' }) => {
  const slug = params?.slug

  const markdown = slug && (await readPostMarkdown({ locale, slug }))

  if (!markdown) {
    return { notFound: true }
  }

  const allPosts = await loadAllPostsByLocale(locale, 'asc')
  const postIndex = allPosts.findIndex((p) => p.slug === slug)
  const [previousPost, nextPost] = [postIndex - 1, postIndex + 1].map((i) => {
    const isValidIndex = i >= 0 && i < allPosts.length

    return isValidIndex ? allPosts[i] : null
  })

  const { content, data } = markdown
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: { remarkPlugins: [prism] },
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      links: {
        next: nextPost && {
          slug: nextPost.slug,
          title: nextPost.post.data.title,
        },
        previous: previousPost && {
          slug: previousPost.slug,
          title: previousPost.post.data.title,
        },
      },
    },
  }
})

export default BlogPost
