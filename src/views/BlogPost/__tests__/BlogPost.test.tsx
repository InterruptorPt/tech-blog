import 'utils/mocks/react-i18next'

import { screen, within } from '@testing-library/react'
import fs from 'fs'
import { GrayMatterFile } from 'gray-matter'

import BlogPost, { getStaticProps } from 'pages/blog/[slug]'
import { BLOG_FILES_FOLDER, readPostMarkdown } from 'utils/blog'
import { assertPropsInResult } from 'utils/next/assertPropsInResult'
import { render } from 'utils/tests/render'

import { BlogPostProps } from '..'

const LOCALES = ['en', 'pt']

const allBlogPosts = fs
  .readdirSync(BLOG_FILES_FOLDER)
  .flatMap((slug) => LOCALES.map((locale) => ({ locale, slug })))

describe.each(allBlogPosts)('Post: $slug ($locale)', ({ locale, slug }) => {
  let markdown: GrayMatterFile<Buffer>
  let pageProps: BlogPostProps

  beforeAll(async () => {
    markdown = (await readPostMarkdown({ locale, slug }))!
    const result = await getStaticProps({
      locale,
      params: { slug },
    })
    assertPropsInResult(result)
    pageProps = result.props
  })

  beforeEach(async () => {
    render(<BlogPost {...pageProps} />)
  })

  it('renders without crashing', () => {
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('shows the title, date, author and translator (if there is one)', async () => {
    const article = within(screen.getByRole('article'))

    const title = article.getByRole('heading', { name: markdown.data.title })

    expect(title).toBeInTheDocument()

    const date = article.getByTestId('firstPublishedDate')

    expect(date).toBeInTheDocument()

    const authorSection = within(article.getByTestId('author'))
    const { author, translator } = markdown.data

    expect(authorSection.getByText(new RegExp(author))).toBeInTheDocument()
    expect(translator).toSatisfy(
      (value) => !value || !!article.queryByText(new RegExp(value)),
    )
  })
})
