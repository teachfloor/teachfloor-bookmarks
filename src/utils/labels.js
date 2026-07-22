import { typeOf } from './types'

/**
 * Default label for a brand-new bookmark.
 *
 * Resource names come from `objectContext` (requires `course_read`,
 * `module_read`, `element_read` perms — see docs/extension-apps/10-permissions.md).
 * When the name isn't available yet (the event hasn't fired, or the
 * viewport doesn't carry that resource), fall back to the viewport label.
 */
export const buildDefaultLabel = (viewport, objectContext) => {
  const { label } = typeOf(viewport)
  if (viewport === 'teachfloor.dashboard.course.element.detail') return objectContext?.element?.name || label
  if (viewport === 'teachfloor.dashboard.course.module.detail')  return objectContext?.module?.name  || label
  if (viewport === 'teachfloor.dashboard.course.detail')         return objectContext?.course?.name  || label
  return label
}

/**
 * Breadcrumb-style hierarchy line shown under each bookmark title —
 * uses resource names from `objectContext` when available.
 */
export const buildContext = (viewport, objectContext) => {
  const parts = []
  if (objectContext?.course?.name && viewport !== 'teachfloor.dashboard.course.detail') {
    parts.push(objectContext.course.name)
  }
  if (objectContext?.module?.name && viewport !== 'teachfloor.dashboard.course.module.detail') {
    parts.push(objectContext.module.name)
  }
  return parts.join(' · ')
}

export const relativeTime = (iso) => {
  if (!iso) return ''
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60)    return 'just now'
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}
