import { screen, within } from '@testing-library/react'
import fs from 'fs'

import HomePage, { getStaticProps } from 'pages'
import { BLOG_FILES_FOLDER } from 'utils/blog'
import { assertPropsInResult } from 'utils/next/assertPropsInResult'
import { render } from 'utils/tests/render'

const LOCALES = ['en', 'pt']

const allBlogPosts = fs.readdirSync(BLOG_FILES_FOLDER)

describe.each(LOCALES)('Home page %s', (locale) => {
  beforeEach(async () => {
    const result = await getStaticProps({ locale })
    assertPropsInResult(result)

    render(<HomePage {...result.props} />)
  })

  it('renders without crashing', () => {
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  describe.each(allBlogPosts)('link to post: %s', (slug) => {
    it('shows the article title', () => {
      const article = screen.getByTestId(slug)
      const title = within(article).getByRole('heading')

      expect(title).toBeInTheDocument()
      expect(title.textContent?.trim()).not.toBe('')
    })

    it('has a link to the post', () => {
      const article = screen.getByTestId(slug)
      const articleLink = article.querySelector(`a[href$="/blog/${slug}"]`)

      expect(articleLink).toBeInTheDocument()
    })
  })
})
