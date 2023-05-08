import React, {useState} from "react";
import {Checkbox, IconButton, InputBase, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";

const Todo = (props) => {

    const [item, setItem] = useState(props.item);

    const [readOnly, setReadOnly] = useState(true);

    const deleteItem = props.deleteItem;

    const editItem = props.editItem;

    const checkboxEventhandler = (e) => {
        item.done = e.target.checked;
        editItem();
    }

    const editEventHandler = (e) => {
        item.title = e.target.value;
        editItem();
    }

    // turnOnReadOnly function write
    const turnOnReadOnly = (e) => {
        if(e.key === "Enter"){
            setReadOnly(true);
        }
    }

    // turnOffReadOnly function write
    const turnOffReadOnly = () => {
        setReadOnly(false);
    }

    // deleteEventhandler write
    const deleteEventhandler = () =>{
        deleteItem(item);
    }

    return (
        <ListItem>
            <Checkbox checked={item.done} onChange={checkboxEventhandler}/>
            <ListItemText>
                <InputBase
                    inputProps={{"aria-label":"naked",
                    readOnly: readOnly}}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onChange={editEventHandler}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    mutiline={true}
                    fullWidth={true}
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete Todo" onClick={deleteEventhandler}>
                    <DeleteOutlined/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>

       /* <div className="Todo">
            <input type="checkbox" id={item.id} name={item.id} value={item.done}/>
            <lebel for={item.id}>{item.title}</lebel>
        </div>*/
    );
};

export default Todo;
