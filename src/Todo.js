import React, {useState} from "react";
import {Checkbox, InputBase, ListItem, ListItemText} from "@mui/material";

const Todo = (props) => {

    const [item, setItem] = useState(props.item);

    return (
        <ListItem>
            <Checkbox checked={item.done}/>
            <ListItemText>
                <InputBase
                    inputProps={{"aria-label":"naked"}}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    mutiline={true}
                    fullWidth={true}
                />
            </ListItemText>
        </ListItem>

       /* <div className="Todo">
            <input type="checkbox" id={item.id} name={item.id} value={item.done}/>
            <lebel for={item.id}>{item.title}</lebel>
        </div>*/
    );
};

export default Todo;
