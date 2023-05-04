import './App.css';
import Todo from './Todo';
import {useState} from "react";
import {Container, List, Paper} from "@mui/material";
import AddTodo from "./AddTodo";
import {AddAlarm} from "@mui/icons-material";

function App() {

    const [items, setItem] = useState([
        {
            id: "7",
            title: "hello world",
            done: true
        },
        {
            id: "4",
            title : "hello world 1",
            done : true
        }
    ]);

    let todoItems = items.length > 0 && (
      <Paper style={{margin : 16}}>
          <List>
              {items.map((item) => (
                  <Todo item={item} key={item.id}/>
              ))}
          </List>
      </Paper>
    );

    return (
        <div className="App">
            <Container maxWidth="md">
                <AddTodo/>
                <div className="TodoList">{todoItems}</div>
            </Container>
        </div>
    );

}

export default App;
