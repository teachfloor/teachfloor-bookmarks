import React from 'react'
import {
  IconBookmark,
  IconPlus,
  IconX,
  IconExternalLink,
  IconDotsVertical,
} from '@tabler/icons-react'

/**
 * Thin wrappers around `@tabler/icons-react` that preserve the
 * `(size, color, filled?)` API the rest of the app already uses.
 * Swap the underlying Tabler icon here when changing the visual.
 */

export const BookmarkIcon = ({ size = 14, color = 'currentColor', filled = false }) => (
  <IconBookmark size={size} color={color} stroke={2} fill={filled ? color : 'none'} />
)

export const PlusIcon = ({ size = 14, color = 'currentColor' }) => (
  <IconPlus size={size} color={color} stroke={2.5} />
)

export const CloseIcon = ({ size = 14, color = 'currentColor' }) => (
  <IconX size={size} color={color} stroke={2.5} />
)

export const ExternalIcon = ({ size = 13, color = 'currentColor' }) => (
  <IconExternalLink size={size} color={color} stroke={2} />
)

export const MoreIcon = ({ size = 14, color = 'currentColor' }) => (
  <IconDotsVertical size={size} color={color} stroke={2} />
)
