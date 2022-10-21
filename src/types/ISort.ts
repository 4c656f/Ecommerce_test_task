export type ISort<T> = [
    keyof T,
    'ASC' | 'DESC'
]