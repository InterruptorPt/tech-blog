import fs from 'fs/promises'
import matter from 'gray-matter'
import { orderBy } from 'lodash'
import path from 'path'

import { enhanceStaticProps } from 'utils/next/enhanceStaticProps'
import { BLOG_FILES_FOLDER } from 'utils/server'
import { HomePage, HomePageProps } from 'views/HomePage'

export const getStaticProps = enhanceStaticProps<HomePageProps>(
  async ({ locale }) => {
    const folderContents = await fs.readdir(BLOG_FILES_FOLDER, {
      withFileTypes: true,
    })

    const postFiles = folderContents.filter((f) => {
      const [, language] = f.name.split('.')

      return language === locale
    })

    const posts = await Promise.all(
      postFiles.map(async (file) => {
        const source = await fs.readFile(
          path.join(BLOG_FILES_FOLDER, file.name),
        )
        const [slug, language] = file.name.split('.')

        const { data } = matter(source)

        return { data, slug, language }
      }),
    )

    const postsByLanguage = posts
      .filter(({ language }) => language === locale)
      .map(({ data, slug }) => ({ data, slug }))

    return {
      props: {
        posts: orderBy(postsByLanguage, (post) => post.data.date, 'desc'),
      },
    }
  },
)

export default HomePage
