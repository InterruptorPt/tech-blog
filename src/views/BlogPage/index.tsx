import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

export type BlogPageProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: {
    title?: string
    description?: string
    author?: string
  }
}

export const BlogPage: React.FC<BlogPageProps> = ({ source, frontMatter }) => {
  return (
    <article className="prose dark:prose-dark mx-auto">
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...source} />
    </article>
  )
}
