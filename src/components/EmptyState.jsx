import React from 'react'
import { Box, Stack, Text } from '@teachfloor/extension-kit'

import { BookmarkIcon } from './Icons'

const EmptyState = () => (
  <Box
    sx={(theme) => ({
      padding: '24px 16px',
      borderRadius: 10,
      border: `1px dashed ${theme.colors.gray[3]}`,
      textAlign: 'center',
    })}
  >
    <Stack spacing={4} align="center">
      <BookmarkIcon size={20} color="#94a3b8" />
      <Text size="sm" c="dimmed">No bookmarks yet</Text>
      <Text size="xs" c="dimmed">Tap + to save this page</Text>
    </Stack>
  </Box>
)

export default EmptyState
