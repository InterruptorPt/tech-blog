import React from 'react'
import Image from 'next/image'
import { MDXProvider } from '@mdx-js/react'

import Link from './Link'

const components = {
  img: Image,
  a: Link,
}

export const Layout: React.FC = (props) => {
  return (
    <MDXProvider components={components}>
      <main {...props} />
    </MDXProvider>
  )
}
