import { useTranslation } from 'next-i18next'

const formatterLocales: Record<string, string[] | undefined> = {
  en: ['en-GB', 'en'],
  pt: ['pt-PT', 'pt'],
}

export const useDateFormatter = (
  options: Intl.DateTimeFormatOptions,
): ((date: string | Date | number) => string) => {
  const { i18n } = useTranslation()
  const { format } = new Intl.DateTimeFormat(
    formatterLocales[i18n.language],
    options,
  )

  return (date) => format(new Date(date))
}
