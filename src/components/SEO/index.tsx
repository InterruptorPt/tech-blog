import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { siteConfig } from 'config/site'

type Props = {
  pageTitle: string
  withTitleSuffix?: boolean
  description?: Maybe<string>
  image?: Maybe<{
    url: Maybe<string>
    alt: Maybe<string>
  }>
  path?: string
  twitter?: {
    cardType: 'summary' | 'summary_large_image'
  }
  type?: 'website' | 'article'
}

type MetaProps = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
> &
  ({ name: string } | { property: string })

export const SEO: React.FC<Props> = ({
  children,
  pageTitle,
  description: descriptionProp,
  image,
  path,
  twitter,
  type = 'website',
  withTitleSuffix = true,
}) => {
  const { t } = useTranslation()
  const router = useRouter()

  const pageURL = `${siteConfig.mainSiteURL}${path || router.asPath}`
  const cardType = twitter ? twitter.cardType : 'summary'
  let imageURL = image?.url || siteConfig.image.url
  if (!/^http/.test(imageURL)) {
    const thisDomain = new URL(siteConfig.blogSiteURL)

    thisDomain.pathname = imageURL

    imageURL = thisDomain.toString()
  }
  const description: string = descriptionProp || t('site.description')

  const metadata: MetaProps[] = [
    { name: 'description', content: description },
    { name: 'twitter:card', content: cardType },
    {
      name: 'twitter:site',
      content: siteConfig.socialMedia.twitter.username,
    },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageURL },
    { name: 'twitter:image:alt', content: image?.alt || '' },
    { property: 'og:url', content: pageURL },
    { property: 'og:type', content: type },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: imageURL },
  ]

  const title = [pageTitle]

  if (withTitleSuffix) title.push(t('site.title.full'))

  return (
    <Head>
      <title>{title.join(' | ')}</title>

      {metadata.map((metaProps) => (
        <meta {...metaProps} key={metaProps.name || metaProps.property} />
      ))}

      {children}
    </Head>
  )
}
