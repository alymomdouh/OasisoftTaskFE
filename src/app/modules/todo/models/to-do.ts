export interface ListToDo {
    id: number
    userId: number
    title: string
    completed: boolean
}

export interface CreateToDo {
    userId: number
    title: string
    completed: boolean
}