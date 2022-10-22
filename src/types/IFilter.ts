export type IFilter<T> = {
    [K in keyof T]?: T[K]|T[K][]
}