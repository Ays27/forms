import ShortAnswer from './inputs/ShortAnswer.vue'
import Paragraph from './inputs/Paragraph.vue'
import MultipleChoice from './inputs/MultipleChoice.vue'
import Checkboxes from './inputs/Checkboxes.vue'
import Dropdown from './inputs/Dropdown.vue'
import Date from './inputs/Date.vue'
import Time from './inputs/Time.vue'

export const questionRegistry = {
  'Short Answer': ShortAnswer,
  Paragraph,
  'Multiple Choice': MultipleChoice,
  Checkboxes,
  Dropdown,
  Date,
  Time
} as const