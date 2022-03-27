import '@testing-library/jest-dom/extend-expect'
import 'jest-extended/all'

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/dist/client/router', () => require('next-router-mock'))
