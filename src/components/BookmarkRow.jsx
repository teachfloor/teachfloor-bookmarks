import React from 'react'
import { Box, Stack, Group, Text, Button, Menu } from '@teachfloor/extension-kit'

import { ExternalIcon, CloseIcon, MoreIcon } from './Icons'
import TypePill from './TypePill'
import { typeOf } from '../utils/types'
import { relativeTime } from '../utils/labels'

const BookmarkRow = ({
  item,
  isCurrent = false,
  onOpen,
  onOpenNewTab,
  onRemove,
  busy,
}) => {
  const { label, path, viewport, context, createdAt } = item.value || {}
  const timestamp = createdAt || item.created_at
  const { color: accentColor } = typeOf(viewport)

  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={() => onOpen(path)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(path) } }}
      sx={(theme) => ({
        padding: '10px 12px',
        borderRadius: 8,
        background: theme.white,
        border: `1px solid ${isCurrent ? accentColor : theme.colors.gray[2]}`,
        boxShadow: `inset 0 0 0 1px ${isCurrent ? accentColor : 'transparent'}`,
        cursor: 'pointer',
        transition: 'transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease',
        '&:hover': {
          borderColor: isCurrent ? accentColor : theme.colors.gray[4],
          // boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
          // transform: 'translateY(-1px)',
        },
      })}
    >
      <Group position="apart" spacing="xs" noWrap align="flex-start">
        <Stack spacing={2} style={{ flex: 1, minWidth: 0 }}>
          <Group spacing={6} mb={2}>
            <TypePill viewport={viewport} />
          </Group>
          <Text size="sm" fw={600} lineClamp={1} style={{ color: '#0f172a' }}>
            {label || typeOf(viewport).label}
          </Text>
          {context ? (
            <Text size="xs" c="dimmed" lineClamp={1}>{context}</Text>
          ) : null}
          <Group spacing={6} mt={2}>
            <Text size="xs" c="dimmed">{relativeTime(timestamp)}</Text>
          </Group>
        </Stack>

        <Menu position="bottom-end" withinPortal shadow="md">
          <Menu.Target>
            <Button
              size="xs"
              variant="subtle"
              color="gray"
              h="auto"
              p={6}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreIcon />
            </Button>
          </Menu.Target>
          <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
            <Menu.Item
              icon={<ExternalIcon size={13} />}
              onClick={(e) => {
                e.stopPropagation()
                onOpenNewTab(path)
              }}
            >
              Open in new tab
            </Menu.Item>
            <Menu.Item
              color="red"
              icon={<CloseIcon size={13} />}
              onClick={(e) => {
                e.stopPropagation()
                onRemove(item.id)
              }}
              disabled={busy}
            >
              Remove bookmark
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  )
}

export default BookmarkRow
