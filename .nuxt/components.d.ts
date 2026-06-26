
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


export const LogoutButton: typeof import("../app/components/LogoutButton.vue")['default']
export const Preview: typeof import("../app/components/Preview.vue")['default']
export const Questions: typeof import("../app/components/Questions.vue")['default']
export const PreviewQuestionRenderer: typeof import("../app/components/preview/QuestionRenderer.vue")['default']
export const PreviewInputsCheckboxes: typeof import("../app/components/preview/inputs/Checkboxes.vue")['default']
export const PreviewInputsDate: typeof import("../app/components/preview/inputs/Date.vue")['default']
export const PreviewInputsDropdown: typeof import("../app/components/preview/inputs/Dropdown.vue")['default']
export const PreviewInputsFileUpload: typeof import("../app/components/preview/inputs/FileUpload.vue")['default']
export const PreviewInputsImage: typeof import("../app/components/preview/inputs/Image.vue")['default']
export const PreviewInputsLinearScale: typeof import("../app/components/preview/inputs/LinearScale.vue")['default']
export const PreviewInputsMultipleChoice: typeof import("../app/components/preview/inputs/MultipleChoice.vue")['default']
export const PreviewInputsParagraph: typeof import("../app/components/preview/inputs/Paragraph.vue")['default']
export const PreviewInputsShortAnswer: typeof import("../app/components/preview/inputs/ShortAnswer.vue")['default']
export const PreviewInputsTime: typeof import("../app/components/preview/inputs/Time.vue")['default']
export const PreviewLogbtn: typeof import("../app/components/preview/logbtn.vue")['default']
export const PreviewQuestionRegistry: typeof import("../app/components/preview/questionRegistry")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtAnnouncer: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyLogoutButton: LazyComponent<typeof import("../app/components/LogoutButton.vue")['default']>
export const LazyPreview: LazyComponent<typeof import("../app/components/Preview.vue")['default']>
export const LazyQuestions: LazyComponent<typeof import("../app/components/Questions.vue")['default']>
export const LazyPreviewQuestionRenderer: LazyComponent<typeof import("../app/components/preview/QuestionRenderer.vue")['default']>
export const LazyPreviewInputsCheckboxes: LazyComponent<typeof import("../app/components/preview/inputs/Checkboxes.vue")['default']>
export const LazyPreviewInputsDate: LazyComponent<typeof import("../app/components/preview/inputs/Date.vue")['default']>
export const LazyPreviewInputsDropdown: LazyComponent<typeof import("../app/components/preview/inputs/Dropdown.vue")['default']>
export const LazyPreviewInputsFileUpload: LazyComponent<typeof import("../app/components/preview/inputs/FileUpload.vue")['default']>
export const LazyPreviewInputsImage: LazyComponent<typeof import("../app/components/preview/inputs/Image.vue")['default']>
export const LazyPreviewInputsLinearScale: LazyComponent<typeof import("../app/components/preview/inputs/LinearScale.vue")['default']>
export const LazyPreviewInputsMultipleChoice: LazyComponent<typeof import("../app/components/preview/inputs/MultipleChoice.vue")['default']>
export const LazyPreviewInputsParagraph: LazyComponent<typeof import("../app/components/preview/inputs/Paragraph.vue")['default']>
export const LazyPreviewInputsShortAnswer: LazyComponent<typeof import("../app/components/preview/inputs/ShortAnswer.vue")['default']>
export const LazyPreviewInputsTime: LazyComponent<typeof import("../app/components/preview/inputs/Time.vue")['default']>
export const LazyPreviewLogbtn: LazyComponent<typeof import("../app/components/preview/logbtn.vue")['default']>
export const LazyPreviewQuestionRegistry: LazyComponent<typeof import("../app/components/preview/questionRegistry")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.4.4_@babel+core@7.29_50511366d20ae63ede64306d9cb00d5d/node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
