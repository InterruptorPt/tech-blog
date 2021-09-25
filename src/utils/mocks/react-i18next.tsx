import React from 'react'
import { TFunction, UseTranslationResponse } from 'react-i18next'
import { i18n as i18next } from 'i18next'

type TransProps = {
  i18nKey: string | string[]
  values?: Record<string, unknown>
  children: React.ReactNode
}

jest.mock('react-i18next', () => {
  const reactI18next = jest.requireActual('react-i18next') as Record<
    string,
    unknown
  >
  const i18n = jest.requireActual<i18next>('i18next')

  return {
    ...reactI18next,
    useTranslation: (_namespaces?: string | string[]) => {
      const t = (
        key: string | string[],
        values: Record<string, unknown> = {},
      ) => {
        const firstKey = typeof key === 'string' ? key : key[0]

        const stringifiedValues = Object.entries(values)
          .map(([key, value]) => `${key}: ${value}`)
          .join(' ')

        return stringifiedValues
          ? `${firstKey} { ${stringifiedValues} }`
          : firstKey
      }
      const tFunction = t as TFunction<string>

      const translationResult = [
        tFunction,
        i18n,
        true,
      ] as UseTranslationResponse<string>
      translationResult.t = tFunction
      translationResult.i18n = i18n
      translationResult.ready = true

      return translationResult
    },
    Trans: ({ i18nKey, values = {}, children }: TransProps) => {
      const key = typeof i18nKey === 'string' ? i18nKey : i18nKey[0]

      return (
        <span data-testid={key}>
          <span data-testid="i18nKey">{i18nKey}</span>
          <span data-testid="children">{children}</span>
          {Object.keys(values).map((key) => (
            <span key={key} data-testid={`values.${key}`}>
              {String(values[key])}
            </span>
          ))}
        </span>
      )
    },
  }
})
