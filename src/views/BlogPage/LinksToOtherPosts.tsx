import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import clsx from 'clsx'

import { Link } from 'components/Link'

export type PostLink = {
  slug: string
  title: string
}

export type LinksToOtherPostsProps = {
  previous: PostLink | null
  next: PostLink | null
}

export const LinksToOtherPosts: React.FC<LinksToOtherPostsProps> = ({
  previous,
  next,
}) => {
  return (
    <ul
      className={clsx(
        'flex flex-col justify-center items-center',
        'md:flex-row md:justify-between',
        'font-display font-bold',
      )}
    >
      {[previous, next].map((link, index) => {
        if (!link) return null

        const isLinkToPrevious = index === 0
        const iconLeft = isLinkToPrevious && (
          <ChevronLeft size={16} strokeWidth={3} />
        )
        const iconRight = !isLinkToPrevious && (
          <ChevronRight size={16} strokeWidth={3} />
        )

        return (
          <li
            key={link.slug}
            className={isLinkToPrevious ? 'md:mr-auto' : 'md:ml-auto'}
          >
            <Link
              href={`/blog/${link.slug}`}
              className="flex items-center space-x-1"
            >
              {iconLeft}
              <span className="chunky-underline-violet-100 dark:chunky-underline-violet-600">
                {link.title}
              </span>
              {iconRight}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
