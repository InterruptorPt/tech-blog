import fs from 'fs/promises'
import glob from 'glob'
import matter from 'gray-matter'
import { orderBy } from 'lodash'

import { enhanceStaticProps } from 'utils/next/enhanceStaticProps'
import { BLOG_FILES_FOLDER } from 'utils/server'
import { HomePage, HomePageProps } from 'views/HomePage'

export const getStaticProps = enhanceStaticProps<HomePageProps>(
  async ({ locale }) => {
    const mdxFiles = glob.sync(`${BLOG_FILES_FOLDER}**/index.${locale}.mdx`)

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const source = await fs.readFile(file)
        const [slug] = file.replace(BLOG_FILES_FOLDER, '').split('/')

        const { data } = matter(source)

        return { data, slug }
      }),
    )

    return {
      props: {
        posts: orderBy(posts, (post) => post.data.date, 'desc'),
      },
    }
  },
)

export default HomePage
