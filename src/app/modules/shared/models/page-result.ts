export interface GenericPageResult<T> {
  totalCount: number
  totalPages: number
  pageSize: number
  currentPage: number
  data: T[]
}
