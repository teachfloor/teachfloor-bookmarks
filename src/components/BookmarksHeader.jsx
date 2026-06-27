import React from 'react'
import { Group, Text, Button, Tooltip } from '@teachfloor/extension-kit'

import { BookmarkIcon, PlusIcon, CloseIcon } from './Icons'

/**
 * Header row: title + count, plus the add/dismiss toggle on the right.
 *
 * Icon swaps based on state:
 *   - panel open     → `×`  (dismiss without saving)
 *   - already saved  → filled bookmark (visual cue, still opens panel for remove)
 *   - otherwise      → `+`
 */
const BookmarksHeader = ({ count, loading, adding, isBookmarked, isSupported = true, accentColor, onToggle }) => {
  /**
   * Icons default to `currentColor`, which inherits the Button's text
   * color — Mantine flips that automatically between light/dark mode
   * for the `variant="default"` button below. We only pass an explicit
   * color when we want the bookmark accent (the saved-state cue).
   */
  const renderIcon = () => {
    if (adding) return <CloseIcon />
    if (isBookmarked) return <BookmarkIcon color={accentColor} filled />
    return <PlusIcon />
  }

  const tooltip = adding
    ? 'Close'
    : isBookmarked
      ? 'This page is bookmarked'
      : 'Bookmark this page'

  return (
    <Group position="apart" mih={28} px={2}>
      <Group spacing={4}>
        <Text size="xs" fw={500} tt="uppercase" c="dimmed">
          Bookmarks
        </Text>
        {!loading && count > 0 && (
          <Group spacing={4}>
            <Text size="xs" c="dimmed">•</Text>
            <Text size="xs" c="dimmed">{count}</Text>
          </Group>
        )}
      </Group>
      {isSupported && (
        <Tooltip label={tooltip}>
          <Button
            size="xs"
            variant="default"
            onClick={onToggle}
            h="auto"
            p={6}
          >
            {renderIcon()}
          </Button>
        </Tooltip>
      )}
    </Group>
  )
}

export default BookmarksHeader
