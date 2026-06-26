
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  LogoutButton: typeof import("../../app/components/LogoutButton.vue")['default']
  Preview: typeof import("../../app/components/Preview.vue")['default']
  Questions: typeof import("../../app/components/Questions.vue")['default']
  PreviewQuestionRenderer: typeof import("../../app/components/preview/QuestionRenderer.vue")['default']
  PreviewInputsCheckboxes: typeof import("../../app/components/preview/inputs/Checkboxes.vue")['default']
  PreviewInputsDate: typeof import("../../app/components/preview/inputs/Date.vue")['default']
  PreviewInputsDropdown: typeof import("../../app/components/preview/inputs/Dropdown.vue")['default']
  PreviewInputsFileUpload: typeof import("../../app/components/preview/inputs/FileUpload.vue")['default']
  PreviewInputsImage: typeof import("../../app/components/preview/inputs/Image.vue")['default']
  PreviewInputsLinearScale: typeof import("../../app/components/preview/inputs/LinearScale.vue")['default']
  PreviewInputsMultipleChoice: typeof import("../../app/components/preview/inputs/MultipleChoice.vue")['default']
  PreviewInputsParagraph: typeof import("../../app/components/preview/inputs/Paragraph.vue")['default']
  PreviewInputsShortAnswer: typeof import("../../app/components/preview/inputs/ShortAnswer.vue")['default']
  PreviewInputsTime: typeof import("../../app/components/preview/inputs/Time.vue")['default']
  PreviewLogbtn: typeof import("../../app/components/preview/logbtn.vue")['default']
  PreviewQuestionRegistry: typeof import("../../app/components/preview/questionRegistry")['default']
  NuxtWelcome: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtAnnouncer: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  NuxtImg: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  NuxtPage: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyLogoutButton: LazyComponent<typeof import("../../app/components/LogoutButton.vue")['default']>
  LazyPreview: LazyComponent<typeof import("../../app/components/Preview.vue")['default']>
  LazyQuestions: LazyComponent<typeof import("../../app/components/Questions.vue")['default']>
  LazyPreviewQuestionRenderer: LazyComponent<typeof import("../../app/components/preview/QuestionRenderer.vue")['default']>
  LazyPreviewInputsCheckboxes: LazyComponent<typeof import("../../app/components/preview/inputs/Checkboxes.vue")['default']>
  LazyPreviewInputsDate: LazyComponent<typeof import("../../app/components/preview/inputs/Date.vue")['default']>
  LazyPreviewInputsDropdown: LazyComponent<typeof import("../../app/components/preview/inputs/Dropdown.vue")['default']>
  LazyPreviewInputsFileUpload: LazyComponent<typeof import("../../app/components/preview/inputs/FileUpload.vue")['default']>
  LazyPreviewInputsImage: LazyComponent<typeof import("../../app/components/preview/inputs/Image.vue")['default']>
  LazyPreviewInputsLinearScale: LazyComponent<typeof import("../../app/components/preview/inputs/LinearScale.vue")['default']>
  LazyPreviewInputsMultipleChoice: LazyComponent<typeof import("../../app/components/preview/inputs/MultipleChoice.vue")['default']>
  LazyPreviewInputsParagraph: LazyComponent<typeof import("../../app/components/preview/inputs/Paragraph.vue")['default']>
  LazyPreviewInputsShortAnswer: LazyComponent<typeof import("../../app/components/preview/inputs/ShortAnswer.vue")['default']>
  LazyPreviewInputsTime: LazyComponent<typeof import("../../app/components/preview/inputs/Time.vue")['default']>
  LazyPreviewLogbtn: LazyComponent<typeof import("../../app/components/preview/logbtn.vue")['default']>
  LazyPreviewQuestionRegistry: LazyComponent<typeof import("../../app/components/preview/questionRegistry")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
