import { loadAllPostsByLocale } from 'utils/blog'
import { enhanceStaticProps } from 'utils/next/enhanceStaticProps'
import { HomePage, HomePageProps } from 'views/HomePage'

export const getStaticProps = enhanceStaticProps<HomePageProps>(
  async ({ locale = 'pt' }) => {
    const posts = await loadAllPostsByLocale(locale, 'desc')

    return {
      props: {
        posts: posts.map(({ slug, post }) => ({ slug, data: post.data })),
      },
    }
  },
)

export default HomePage
