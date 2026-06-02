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
      styles={{
        root: {
          backgroundColor: `${color}14`,
          color,
        },
      }}
    >
      {label}
    </Badge>
  )
}

export default TypePill
