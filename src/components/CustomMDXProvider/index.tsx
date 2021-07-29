import React from 'react'
import Image from 'next/image'
import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react'

import { Link } from '../Link'

const createHeading = (Level: 'h1' | 'h2' | 'h3' | 'h4'): React.FC => {
  return ({ children, ...props }) => (
    <Level {...props}>
      <span className="chunky-underline-violet-200 dark:chunky-underline-violet-600">
        {children}
      </span>
    </Level>
  )
}

const components: MDXProviderComponentsProp = {
  a: Link,
  img: (props: { src: string; alt: string }) => {
    return (
      <div className="flex justify-center">
        <Image
          {...props}
          alt={props.alt || ''}
          height={340}
          width={600}
          objectFit="contain"
        />
      </div>
    )
  },
  h2: createHeading('h2'),
  h3: createHeading('h3'),
  h4: createHeading('h4'),
}

export const CustomMDXProvider: React.FC = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
