import React from 'react'
import { Box, Stack, Text } from '@teachfloor/extension-kit'

import { BookmarkIcon } from './Icons'

const EmptyState = () => (
  <Box
    sx={(theme) => ({
      padding: '24px 16px',
      borderRadius: 10,
      border: `1px dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
      textAlign: 'center',
    })}
  >
    <Stack spacing={4} align="center">
      {/**
       * `currentColor` lets the icon inherit the dimmed Text color set
       * by Mantine's `c="dimmed"` rule below — auto-flips between
       * gray[6] (light) and dark[2] (dark) for free.
       */}
      <BookmarkIcon size={20} color="currentColor" />
      <Text size="sm" c="dimmed">No bookmarks yet</Text>
      <Text size="xs" c="dimmed">Tap + to save this page</Text>
    </Stack>
  </Box>
)

export default EmptyState
