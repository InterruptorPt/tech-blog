import { Facebook, GitHub, Icon, Instagram, Mail, Twitter } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { siteConfig } from 'config/site'

type SocialLink = {
  href: string
  text: string
  Icon: Icon
}
const { links, socialMedia, email } = siteConfig

export const useSocialLinks = (): SocialLink[] => {
  const { t } = useTranslation()

  return [
    {
      href: `mailto:${email.general}`,
      text: t('footer.contactUs.email'),
      Icon: Mail,
    },
    {
      href: links.github.url,
      text: t('social.followOn.github'),
      Icon: GitHub,
    },
    {
      href: socialMedia.facebook.url,
      text: t('social.followOn.facebook'),
      Icon: Facebook,
    },
    {
      href: socialMedia.instagram.url,
      text: t('social.followOn.instagram'),
      Icon: Instagram,
    },
    {
      href: socialMedia.twitter.url,
      text: t('social.followOn.twitter'),
      Icon: Twitter,
    },
  ]
}
