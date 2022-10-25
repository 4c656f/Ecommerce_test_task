import {ComponentProps} from "react";


type CustomFromInputProps = {
    uuid: number
    name: string
    label?: string
    errorMessage?: string
}

type DefaultFromInputProps = ComponentProps<'input'>

export type IFormElement = Array<CustomFromInputProps & Omit<DefaultFromInputProps, keyof CustomFromInputProps>>