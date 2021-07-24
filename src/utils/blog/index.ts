import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

import { doesFileExist } from '../server'

export const BLOG_FILES_FOLDER = path.join(process.cwd(), '/content/blog/')

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
