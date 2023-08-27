import Select, { SelectProps } from "@mui/material/Select";
import Option from "@mui/material/Select";
import { useState } from "react";

export interface DropdownOption {
    name: string,
    value: number | string
}

interface DropdownProps extends SelectProps{
    options: string[] | number[] | DropdownOption[],
    emptyOption: boolean
}

export default function Dropdown(props: DropdownProps) {
    const [dropdownOptions, setDropdownOptions] = useState<string[] | number[] | DropdownOption[]>(props.options)
    return (
        <Select
            {...props}
            >
                {props.emptyOption? (<Option value=""></Option>) : null }
                {
                    dropdownOptions.map((option) => {
                        let isDropdownOption = typeof option !== "number" && typeof option !== "string";
                        if(isDropdownOption) {
                            let optionAsDropdownOption = option as DropdownOption;
                            return (<Option value={optionAsDropdownOption.value}>{optionAsDropdownOption.name}</Option>)
                        }
                        let optionAsSingleValue = option as number | string
                        return (<Option value={optionAsSingleValue}>{optionAsSingleValue}</Option>)
                    })   
                }
        </Select>
    )
}