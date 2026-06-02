/**
 * Type registry — one entry per viewport we support. The colored left
 * edge of each bookmark card is driven by `color`; `label` is shown in
 * the small type pill and used as the fallback bookmark name when no
 * resource name is available from `objectContext`.
 */
export const TYPES = {
  'teachfloor.dashboard.course.list':            { label: 'All courses',  color: '#4CAF50' },
  'teachfloor.dashboard.course.detail':          { label: 'Course',       color: '#4CAF50' },
  'teachfloor.dashboard.course.module.list':     { label: 'Modules',      color: '#4CAF50' },
  'teachfloor.dashboard.course.module.detail':   { label: 'Module',       color: '#4CAF50' },
  'teachfloor.dashboard.course.element.detail':  { label: 'Lesson',       color: '#4CAF50' },
  'teachfloor.dashboard.course.assessment.list': { label: 'Assessments',  color: '#4CAF50' },
  'teachfloor.dashboard.course.progress.detail': { label: 'Progress',     color: '#4CAF50' },
  'teachfloor.dashboard.course.calendar.detail': { label: 'Calendar',     color: '#4CAF50' },
  'teachfloor.dashboard.course.member.list':     { label: 'Members',      color: '#4CAF50' },
  'teachfloor.dashboard.community.post.list':    { label: 'Community Channel', color: '#9c27b0' },
  'teachfloor.dashboard.community.member.list':  { label: 'Community Members', color: '#9c27b0' },
}

export const FALLBACK_TYPE = { label: 'Page', color: '#64748b' }

export const typeOf = (viewport) => TYPES[viewport] || FALLBACK_TYPE
