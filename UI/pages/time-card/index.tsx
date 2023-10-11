import { Button, Grid, Select } from "@mui/material";
import { DateTimePicker, DesktopDatePicker, DesktopDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { startOfWeek, endOfWeek, getTime } from "date-fns";
import { useEffect, useState } from "react";
import Dropdown, { DropdownOption } from "../../components/dropdown";

export default function TimeCard() {

    let currentDate = Date.now();
    let endOfCurrentWeek = endOfWeek(currentDate, {weekStartsOn: 1});
    let startOfCurrentWeek = startOfWeek(currentDate, {weekStartsOn: 1});

    const [startDate, setStartDate] = useState<Date>(startOfCurrentWeek);
    const [endDate, setEndDate] = useState<Date>(endOfCurrentWeek);
    const [weekIncrement, setWeekIncrement] = useState<number | ''>('');
    const [weekSelection, setWeekSelection] = useState<DropdownOption[]>([]);
    
    const weekInMilliseconds = 7*24*60*60*1000;
    
    const weekEndSelected = (weekSelected: number) => {
        return endOfWeek(currentDate + weekSelected * weekInMilliseconds, {weekStartsOn: 1})
    }

    const weekStartSelected = (weekSelected: number) => {
        return startOfWeek(currentDate + weekSelected * weekInMilliseconds, {weekStartsOn: 1});
    }

    const generateWeeks = (count: number) => {
        let weekSelection: DropdownOption[] = [];
        const localeOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
        for(let i= count * -1; i <= count; i++) {
            let weekSelected = currentDate + (i * weekInMilliseconds);
            let endOfSelectedWeek = endOfWeek(weekSelected, {weekStartsOn: 1});
            let startOfSelectedWeek = startOfWeek(weekSelected, {weekStartsOn: 1});
            weekSelection.push(
                {
                    name: startOfSelectedWeek.toLocaleDateString('en-US',localeOptions) + " to " + endOfSelectedWeek.toLocaleDateString('en-US', localeOptions),
                    value: i
                }
            );
        }
        return weekSelection;
    }

    useEffect(() => {
        setWeekSelection(generateWeeks(5));
    },[])

    useEffect(()=> {
        if(weekIncrement !== '') {
            setStartDate(weekStartSelected(weekIncrement));
            setEndDate(weekEndSelected(weekIncrement));
        }
    }, [weekIncrement])

    return (
        <>  
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <p>Starting basic support for a Time Card</p>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Dropdown
                            label="Week Selection"
                            options={weekSelection} 
                            emptyoption={true}
                            value={weekIncrement}
                            onChange= {(e:{target:{value:any, name: string}}) => {
                                if(typeof e.target.value === "string") {
                                    setWeekIncrement('');
                                }
                                let weekSelected = e.target.value as number;
                                setWeekIncrement(weekSelected);
                            }}
                            style={{minWidth: 300}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <DesktopDatePicker
                            disabled={true}
                            label="Start Date for Time Sheet"
                            format="yyyy-MM-dd"
                            defaultValue={startOfCurrentWeek}
                            value={startDate}
                            onChange={(value) => setStartDate(value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <DesktopDatePicker
                            disabled={true}
                            label="End Date for Time Sheet"
                            format="yyyy-MM-dd"
                            defaultValue={endOfCurrentWeek}
                            value={endDate}
                            onChange={(value) => setEndDate(value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Button
                            onClick={() => {
                                
                            }}
                            >Create Time Sheet</Button>
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </>
    )
}
