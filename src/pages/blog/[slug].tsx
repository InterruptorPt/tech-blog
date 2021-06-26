import { GetStaticPaths } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

import { enhanceStaticProps } from 'utils/next/enhanceStaticProps'

const Test: React.FC<PageProps> = ({ source, frontMatter }) => {
  return (
    <article className="prose dark:prose-dark mx-auto">
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...source} />
    </article>
  )
}

export default Test

type PageProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: { title?: string; author?: string }
}

const BLOG_FILES_FOLDER = path.join(process.cwd(), '/content/blog/')

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const files = await fs.readdir(BLOG_FILES_FOLDER, { withFileTypes: true })

  return {
    paths: files.map((f) => {
      const [slug, locale] = f.name.split('.')

      return { params: { slug }, locale }
    }),
    fallback: false,
  }
}

export const getStaticProps = enhanceStaticProps<PageProps, { slug: string }>(
  async ({ params, locale }) => {
    const slug = params?.slug

    if (!slug || !locale) {
      return { notFound: true }
    }

    const filename = `${slug}.${locale}.mdx`

    const source = await fs.readFile(path.join(BLOG_FILES_FOLDER, filename))

    // MDX text - can be from a local file, database, anywhere

    const { content, data } = matter(source)
    const mdxSource = await serialize(content, { scope: data })

    return { props: { source: mdxSource, frontMatter: data } }
  },
)
