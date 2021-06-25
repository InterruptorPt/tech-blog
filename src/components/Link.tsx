import NextLink, { LinkProps } from 'next/link'

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  (
    | LinkProps
    | {
        isExternal: true
        href: string
      }
  )

export const Link: React.FC<Props> = ({ children, ...props }) => {
  if ('isExternal' in props) {
    const { isExternal, href, ...anchorProps } = props

    return (
      <a {...anchorProps} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  const {
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    href,
    locale,
    ...anchorProps
  } = props

  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a {...anchorProps}>{children}</a>
    </NextLink>
  )
}
