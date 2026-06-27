import React from 'react'
import { Box, Stack, Group, Text, Button, TextInput, Tooltip } from '@teachfloor/extension-kit'

import { BookmarkIcon, CloseIcon } from './Icons'
import TypePill from './TypePill'
import { typeOf } from '../utils/types'

/**
 * Slide-down panel for the current page. Two states:
 *
 *   - Already bookmarked → show what's saved + a "Remove" action
 *   - Not bookmarked     → name input + Cancel/Save
 */
const AddBookmarkPanel = ({
  viewport,
  isBookmarked,
  currentBookmark,
  label,
  onLabelChange,
  busy,
  onSave,
  onCancel,
  onRemove,
}) => {
  const type = typeOf(viewport)

  return (
    <Box
      sx={() => ({
        padding: '10px 12px',
        borderRadius: 8,
        border: `1px solid ${type.color}26`,
      })}
    >
      <Group spacing={6} mb={isBookmarked ? 4 : 10}>
        <BookmarkIcon size={12} color={type.color} filled={isBookmarked} />
        <Text size="xs" fw={700} tt="uppercase" style={{ color: type.color, letterSpacing: 0.6 }}>
          {isBookmarked ? 'Already bookmarked' : 'Current page'}
        </Text>
      </Group>

      {isBookmarked ? (
        <Group position="apart" spacing="xs" noWrap>
          <Stack spacing={2} style={{ flex: 1, minWidth: 0 }}>
            <Text size="sm" fw={600} lineClamp={1}>{currentBookmark?.value?.label}</Text>
            {currentBookmark?.value?.context ? (
              <Text size="xs" c="dimmed" lineClamp={1}>{currentBookmark.value.context}</Text>
            ) : null}
          </Stack>
          <Tooltip label="Remove bookmark">
            <Button
              size="xs"
              variant="subtle"
              color="red"
              h="auto"
              p={6}
              onClick={onRemove}
              disabled={busy}
            >
              <CloseIcon size={13} />
            </Button>
          </Tooltip>
        </Group>
      ) : (
        <Stack spacing={8}>
          <TextInput
            placeholder="Bookmark name"
            value={label}
            onChange={(e) => onLabelChange(e.currentTarget.value)}
            disabled={busy}
            autoFocus
            styles={(theme) => ({
              input: {
                /**
                 * Drop the hardcoded white background — in dark mode
                 * we want the input to read as a darker surface inside
                 * the type-tinted panel. The border keeps its accent
                 * tint at 25% alpha in both schemes.
                 */
                background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
                borderColor: `${type.color}40`,
              },
            })}
          />
          <Group position="apart" spacing="xs">
            <TypePill viewport={viewport} />
            <Group spacing="xs">
              <Button size="xs" variant="subtle" color="gray" onClick={onCancel} disabled={busy}>
                Cancel
              </Button>
              <Button
                size="xs"
                onClick={onSave}
                disabled={busy}
                styles={{ root: { backgroundColor: type.color, '&:hover': { backgroundColor: type.color, filter: 'brightness(0.92)' } } }}
              >
                Save
              </Button>
            </Group>
          </Group>
        </Stack>
      )}
    </Box>
  )
}

export default AddBookmarkPanel
