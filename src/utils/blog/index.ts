import fs from 'fs/promises'
import glob from 'glob'
import matter from 'gray-matter'
import { orderBy } from 'lodash'
import path from 'path'

import { doesFileExist } from '../server'

export const BLOG_FILES_FOLDER = path.join(process.cwd(), '/content/blog/')

export const loadAllPostsByLocale = async (
  locale: string,
  sortDirection: 'asc' | 'desc',
): Promise<{ post: matter.GrayMatterFile<Buffer>; slug: string }[]> => {
  const mdxFiles = glob.sync(`${BLOG_FILES_FOLDER}**/index.${locale}.mdx`)

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const source = await fs.readFile(file)
      const [slug] = file.replace(BLOG_FILES_FOLDER, '').split('/')

      return { post: matter(source), slug }
    }),
  )

  return orderBy(posts, ({ post }) => post.data.date, sortDirection)
}

type ReadPostMarkdownArgs = {
  locale: string
  slug: string
}

export const readPostMarkdown = async ({
  locale,
  slug,
}: ReadPostMarkdownArgs): Promise<matter.GrayMatterFile<Buffer> | null> => {
  const filename = path.join(BLOG_FILES_FOLDER, `${slug}/index.${locale}.mdx`)
  const fileExists = await doesFileExist(filename)

  if (!fileExists) return null

  const source = await fs.readFile(filename)

  return matter(source)
}
