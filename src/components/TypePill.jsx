import React from 'react'
import { Badge } from '@teachfloor/extension-kit'

import { typeOf } from '../utils/types'

const TypePill = ({ viewport }) => {
  const { label, color } = typeOf(viewport)
  return (
    <Badge
      variant="light"
      size="xs"
      radius="xl"
      styles={(theme) => ({
        root: {
          /**
           * Tint the pill with the type's accent color. Light mode
           * gets ~8% alpha (subtle on a near-white surface); dark mode
           * gets ~22% alpha so the pill stays legible against the dark
           * card background. Hex suffix is the alpha byte (00–FF).
           */
          backgroundColor: `${color}${theme.colorScheme === 'dark' ? '38' : '14'}`,
          color,
        },
      })}
    >
      {label}
    </Badge>
  )
}

export default TypePill
