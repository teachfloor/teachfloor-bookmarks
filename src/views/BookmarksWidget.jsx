import React, { useState, useEffect, useMemo } from 'react'
import {
  Stack,
  Group,
  Loader,
  WidgetView,
  createCollection,
  showToast,
} from '@teachfloor/extension-kit'

import BookmarkRow from '../components/BookmarkRow'
import EmptyState from '../components/EmptyState'
import { openInCurrentTab, openInNewTab } from '../utils/navigation'

const COLLECTION_KEY = 'bookmarks'
const MAX_ITEMS = 5

/**
 * Dashboard widget — passive "recent bookmarks" list. Reuses the
 * same `BookmarkRow` / `EmptyState` components the drawer uses so
 * cards look identical across surfaces.
 *
 * The drawer's add-flow / viewport-awareness / label-input state
 * doesn't apply here: the dashboard viewport isn't itself a
 * bookmarkable resource, so a widget-side "add" affordance would
 * be misleading. Kept lean intentionally — the widget's job is to
 * surface saved spots, not manage them.
 */
const BookmarksWidget = () => {
  const collection = useMemo(() => createCollection(COLLECTION_KEY), [])

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)

  const refresh = async () => {
    setLoading(true)
    try {
      const all = await collection.getAll({ limit: MAX_ITEMS })
      setItems(all)
    } catch (_) {
      showToast('Could not load bookmarks', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  const handleRemove = async (id) => {
    setBusy(true)
    try {
      await collection.remove(id)
      showToast('Bookmark removed')
      await refresh()
    } catch (_) {
      showToast('Could not remove bookmark', { type: 'error' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <WidgetView p="md">
      {loading ? (
        <Group position="center" p="md"><Loader size="sm" /></Group>
      ) : items.length === 0 ? (
        <EmptyState />
      ) : (
        <Stack spacing="xs">
          {items.map((item) => (
            <BookmarkRow
              key={item.id}
              item={item}
              isCurrent={false}
              onOpen={openInCurrentTab}
              onOpenNewTab={openInNewTab}
              onRemove={handleRemove}
              busy={busy}
            />
          ))}
        </Stack>
      )}
    </WidgetView>
  )
}

export default BookmarksWidget
