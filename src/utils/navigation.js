import { goToPath } from '@teachfloor/extension-kit'

/**
 * Best-effort parent-frame origin so we can build absolute URLs for
 * new-tab navigation. Chromium exposes `ancestorOrigins`; Firefox
 * falls back to `document.referrer`.
 */
export const parentOrigin = () =>
  (window.location.ancestorOrigins && window.location.ancestorOrigins[0])
  || (document.referrer && new URL(document.referrer).origin)
  || ''

/**
 * Open in the current tab via the SDK's `goToPath` helper — emits
 * `request.path.change` which the dashboard turns into a
 * `history.push(path)`. No cross-origin issues because we never touch
 * the parent's `location` directly.
 */
export const openInCurrentTab = (path) => {
  goToPath(path)
}

export const openInNewTab = (path) => {
  window.open(`${parentOrigin()}${path}`, '_blank', 'noopener,noreferrer')
}
