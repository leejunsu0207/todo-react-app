import './App.css';
import Todo from './Todo';
import {useEffect, useState} from "react";
import {Container, List, Paper} from "@mui/material";
import AddTodo from "./AddTodo";


function App() {

    useEffect(() => {
        const requestOptions = {
            method : "GET",
            headers : {"Content-Type": "application/json"}
        }

        fetch("http://localhost:8080/todo", requestOptions)
            .then((response) => response.json())
            .then(
                (response) => {
                    setItems(response.data);
                },
                (error) => {

                }
            );
    }, {});


    const [items, setItems] = useState([
       /* {
            id: "7",
            title: "hello world",
            done: true,
        },
        {
            id: "4",
            title : "hello world 1",
            done : true,
        },*/
    ]);

    const editItem = () => {
        setItems([...items]);
    }

    const deleteItem = (item) => {
        // 삭제할 아이템을 찾는다.
        const newItems = items.filter(e => e.id !== item.id);
        // 삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다.
        setItems([...newItems]);
    }

    const addItem = (item) =>{
        item.id = "ID-" + items.length; // key를 위한 id
        item.done = false; // done 초기화
        // update는 반드시 setItes로하고 새 배열을 만들어야 한다.
        setItems([...items, item]);
        console.log("items :", items);
    };

    let todoItems = items.length > 0 && (
      <Paper style={{margin : 16}}>
          <List>
              {items.map((item) => (
                  <Todo item={item}
                        key={item.id}
                        editItem={editItem}
                        deleteItem={deleteItem}/>
              ))}
          </List>
      </Paper>
    );

    return (
        <div className="App">
            <Container maxWidth="md">
                <AddTodo addItem={addItem} />
                <div className="TodoList">{todoItems}</div>
            </Container>
        </div>
    );

}

export default App;
