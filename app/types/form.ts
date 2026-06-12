export type QuestionType =
  | 'Short Answer'
  | 'Paragraph'
  | 'Multiple Choice'
  | 'Checkboxes'
  | 'Dropdown'
  | 'Linear Scale'
  | 'Date'
  | 'Time'
  | 'image'
  | 'file upload'

export interface Option {
  text: string
  imageUrl?: string
}

export interface Question {
  id: number
  title: string
  type: QuestionType
  required: boolean
  options: Option[]
  sectionId: number
  goToSectionId?: number
  imageUrl?: string
  videoUrl?: string
}

export interface Section {
  id: number
  title: string
}