import React, {useState} from "react";
import {Alert, Button, Collapse, Grid, Stack, TextField} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import {Link} from "react-router-dom";

const SearchOrgNm = (props) => {

    const [item, setItem] = useState(props.item);

    const [search, setSearch] = useState({orgInfo:""});

    const searchItem = props.searchItem;

    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...props.item]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const enterKeyEventhandler = (e) => {
        if(e.key === 'Enter'){
            onButtonClick();
        }
    }

    const onButtonClick = () => {
        searchItem(search);
        setSearch({orgInfo: ""});
    }

    let alertComponet;

    const addSr = () => {
        if(search.orgInfo === "" || search.orgInfo === null){
            // alertComponet = (<Alert severity="warning"></Alert>);
            alert("add after search");
            return false;
        }

        window.location.href="/addSr?orgNm="+search.orgInfo.orgNm+"&orgCd="+search.orgInfo.orgCd;
    }


    return (
        <Grid container style={{marginTop: 20}}>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <Autocomplete
                    style={{margin : 16}}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onChange={(event, newValue) => {
                        if(newValue === null){
                            setSearch({orgInfo: ""});
                        }else{

                            setSearch({orgInfo: newValue});
                        }
                    }}
                    onKeyPress={enterKeyEventhandler}
                    isOptionEqualToValue={(option, value) => option.orgNm === value.orgNm}
                    getOptionLabel={(option) => option.orgNm}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="orgNm-serach"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid sx={1} md={1} item>
                <Button fullWidth style={{height: '100%'}} color="secondary" cariant="outlined"
                        onClick={addSr}
                >
                    sr add
                </Button>
            </Grid>
        </Grid>
    );

}

export default SearchOrgNm;