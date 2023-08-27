import { Grid, Select } from "@mui/material";
import { DateTimePicker, DesktopDatePicker, DesktopDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { startOfWeek, endOfWeek, getTime } from "date-fns";
import { useState } from "react";
import Dropdown, { DropdownOption } from "../../components/dropdown";



export default function TimeCard() {
    let curentDate = Date.now();
    let endOfCurrentWeek = endOfWeek(curentDate, {weekStartsOn: 1});
    let startOfCurrentWeek = startOfWeek(curentDate, {weekStartsOn: 1});
    const [startDate, setStartDate] = useState<Date>(startOfCurrentWeek);
    const [endDate, setEndDate] = useState<Date>(endOfCurrentWeek);
    const [weekIncrement, setWeekIncrement] = useState<number>(0);
    const [weekSelection, setWeekSelection] = useState<DropdownOption[]>(generateWeeks(5));
    console.log(weekSelection);

    const weekEndSelected = () => {

    }
    return (
        <>  
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <p>Starting basic support for a Time Card</p>
                <Grid container spacing={2}>
                    <Grid item>
                        <Dropdown options={[]} emptyOption={false}/>
                    </Grid>
                    <Grid item>
                        <DesktopDatePicker
                            label="Start Date for Time Sheet"
                            format="yyyy-MM-dd"
                            defaultValue={startOfCurrentWeek}
                            value={startDate}
                            onChange={(value) => setStartDate(value)}
                        />
                    </Grid>
                    <Grid item>
                        <DesktopDatePicker
                            label="End Date for Time Sheet"
                            format="yyyy-MM-dd"
                            defaultValue={endOfCurrentWeek}
                            value={endDate}
                            onChange={(value) => setEndDate(value)}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </>
    )
}

function generateWeeks(count: number) {
    const weekInMilliseconds = 7*24*60*60*1000;
    let currentDate = Date.now(); 
    let weekSelection: DropdownOption[] = [];
    for(let i=count*-1; i<count; i++) {
        let weekSelected = currentDate - (i * weekInMilliseconds);
        let endOfCurrentWeek = endOfWeek(weekSelected, {weekStartsOn: 1});
        let startOfCurrentWeek = startOfWeek(weekSelected, {weekStartsOn: 1});
        weekSelection.push(
            {
                name: startOfCurrentWeek.toString() + " to " + endOfCurrentWeek.toString(),
                value: i
            }
        );
    }
    return weekSelection;
}

function weekStartSelected() {
    
}