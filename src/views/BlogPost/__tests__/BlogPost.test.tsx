import { getPage } from 'next-page-tester'
import { screen, within } from '@testing-library/react'
import fs from 'fs'
import { GrayMatterFile } from 'gray-matter'

import { BLOG_FILES_FOLDER, readPostMarkdown } from 'utils/blog'

const LOCALES = ['en', 'pt']

const allBlogPosts = fs
  .readdirSync(BLOG_FILES_FOLDER)
  .flatMap((slug) => LOCALES.map((locale) => ({ locale, slug })))

describe.each(allBlogPosts)('Post: $slug ($locale)', ({ locale, slug }) => {
  let markdown: GrayMatterFile<Buffer>

  beforeAll(async () => {
    markdown = (await readPostMarkdown({ locale, slug }))!
  })

  beforeEach(async () => {
    const { render } = await getPage({ route: `/${locale}/blog/${slug}` })

    render()
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

    const { author, translator } = markdown.data

    expect(article.getByText(new RegExp(author))).toBeInTheDocument()
    expect(translator).toSatisfy(
      (value) => !value || !!article.queryByText(new RegExp(value)),
    )
  })
})
