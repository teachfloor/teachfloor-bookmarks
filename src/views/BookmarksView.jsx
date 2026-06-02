import React, { useState, useEffect, useMemo } from 'react'
import {
  Container,
  Stack,
  Group,
  Loader,
  useExtensionContext,
  createCollection,
  subscribeToEvent,
  showToast,
} from '@teachfloor/extension-kit'

import BookmarksHeader from '../components/BookmarksHeader'
import AddBookmarkPanel from '../components/AddBookmarkPanel'
import BookmarkRow from '../components/BookmarkRow'
import EmptyState from '../components/EmptyState'
import { openInCurrentTab, openInNewTab } from '../utils/navigation'
import { buildDefaultLabel, buildContext } from '../utils/labels'
import { typeOf, isSupportedViewport } from '../utils/types'

const COLLECTION_KEY = 'bookmarks'

const BookmarksView = () => {
  const { environment } = useExtensionContext()
  const collection = useMemo(() => createCollection(COLLECTION_KEY), [])

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [label, setLabel] = useState('')
  const [adding, setAdding] = useState(false)

  /**
   * Latest `objectContext` keyed by viewport. Captured from
   * `environment.viewport.changed` so we can label new bookmarks with
   * the real course/module/lesson name.
   */
  const [contextByViewport, setContextByViewport] = useState({})

  const refresh = async () => {
    setLoading(true)
    try {
      const all = await collection.getAll({ limit: 50 })
      setItems(all)
    } catch (_) {
      showToast('Could not load bookmarks', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  /**
   * Subscribe to viewport changes once and stash the `objectContext`
   * per viewport — the parent re-emits it on every navigation, so this
   * stays fresh as the user moves around.
   */
  useEffect(() => {
    const unsub = subscribeToEvent('environment.viewport.changed', (viewport, objectContext) => {
      if (!viewport) return
      setContextByViewport((prev) => ({ ...prev, [viewport]: objectContext || null }))
    })
    return () => { if (typeof unsub === 'function') unsub() }
  }, [])

  const objectContext = contextByViewport[environment.viewport]

  /**
   * Pre-fill the label input each time the viewport — or its context —
   * changes. Resource name wins over generic "Lesson" when available.
   */
  useEffect(() => {
    setLabel(buildDefaultLabel(environment.viewport, objectContext))
  }, [environment.viewport, objectContext])

  const currentBookmark = items.find((it) => it.value?.path === environment.path)
  const isBookmarked = Boolean(currentBookmark)
  const currentType = typeOf(environment.viewport)
  const supported = isSupportedViewport(environment.viewport)

  /**
   * If the user navigates to a viewport we don't support while the
   * panel is open, drop them back to the list — there's no `+` button
   * to dismiss it from, and the panel itself isn't meaningful here.
   */
  useEffect(() => {
    if (!supported && adding) setAdding(false)
  }, [supported, adding])

  const handleSave = async () => {
    if (busy || isBookmarked) return
    setBusy(true)
    try {
      await collection.add({
        label: label.trim() || buildDefaultLabel(environment.viewport, objectContext),
        context: buildContext(environment.viewport, objectContext),
        path: environment.path,
        viewport: environment.viewport,
        createdAt: new Date().toISOString(),
      })
      showToast('Bookmark added')
      setAdding(false)
      await refresh()
    } catch (_) {
      showToast('Could not save bookmark', { type: 'error' })
    } finally {
      setBusy(false)
    }
  }

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
    <Container
      sx={(theme) => ({
        padding: theme.spacing.xs,
        [theme.fn.largerThan('sm')]: { padding: theme.spacing.md },
      })}
    >
      <Stack spacing="xs">
        <BookmarksHeader
          count={items.length}
          loading={loading}
          adding={adding}
          isBookmarked={isBookmarked}
          isSupported={supported}
          accentColor={currentType.color}
          onToggle={() => setAdding((v) => !v)}
        />

        {adding ? (
          <AddBookmarkPanel
            viewport={environment.viewport}
            isBookmarked={isBookmarked}
            currentBookmark={currentBookmark}
            label={label}
            onLabelChange={setLabel}
            busy={busy}
            onSave={handleSave}
            onCancel={() => setAdding(false)}
            onRemove={async () => { await handleRemove(currentBookmark.id); setAdding(false) }}
          />
        ) : loading ? (
          <Group position="center" p="md">
            <Loader size="sm" />
          </Group>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <Stack spacing="xs">
            {items.map((item) => (
              <BookmarkRow
                key={item.id}
                item={item}
                isCurrent={item.value?.path === environment.path}
                onOpen={openInCurrentTab}
                onOpenNewTab={openInNewTab}
                onRemove={handleRemove}
                busy={busy}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  )
}

export default BookmarksView
