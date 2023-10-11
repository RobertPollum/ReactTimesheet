import { InputLabel, MenuItem } from "@mui/material";
import Select, { SelectProps } from "@mui/material/Select";

export interface DropdownOption {
    name: string,
    value: number | string
}

interface DropdownProps extends SelectProps{
    options: string[] | number[] | DropdownOption[],
    emptyoption?: boolean
}

export default function Dropdown(props: DropdownProps) {
    let selectProps = props as SelectProps;
    return (
        <>
            {/* <InputLabel id={props.id + '-label'}>{props.label ?? ""}</InputLabel> */}
            <Select
                {...selectProps}
                labelId= {props.id + '-label'}
                // label={props.label}
                // id={props.id}
                autoWidth={true}
                // value={props.value}
                // onChange={props.onChange}
                >
                    {props.emptyoption?? false ? (<MenuItem key="" value="">{props.label}</MenuItem>) : null }
                    {
                        props.options.map((option) => {
                            let isDropdownOption = typeof option !== "number" && typeof option !== "string";
                            if(isDropdownOption) {
                                let optionAsDropdownOption = option as DropdownOption;
                                return (<MenuItem key={optionAsDropdownOption.value} value={optionAsDropdownOption.value}>{optionAsDropdownOption.name}</MenuItem>)
                            }
                            let optionAsSingleValue = option as number | string;
                            return (<MenuItem key={optionAsSingleValue} value={optionAsSingleValue}>{optionAsSingleValue}</MenuItem>)
                        })   
                    }
            </Select>
            </>
    )
}