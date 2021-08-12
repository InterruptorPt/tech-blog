import NextLink, { LinkProps as NextLinkProps } from 'next/link'

type HTMLAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

type LinkProps = Omit<HTMLAnchorProps, 'href'> & NextLinkProps

export const Link: React.FC<LinkProps> = ({ children, href, ...props }) => {
  if (typeof href === 'string' && /^(http|mailto|tel)/.test(href)) {
    const isExternalLink = /^http/.test(href)
    const extraAnchorProps: HTMLAnchorProps = isExternalLink
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}

    return (
      <a {...props} {...extraAnchorProps} href={href}>
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
      <a {...anchorProps}>{children}</a>
    </NextLink>
  )
}
