export interface LoginDto {
    email: string
    password: string
}
export interface RegisterDto {
    email: string
    password: string
    name: string
    userName: string
}
export interface UserResult {
    email: string
    password: string
    name: string
    userName: string
    token: string
    id: number
}