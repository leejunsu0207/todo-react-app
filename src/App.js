import './App.css';
import Todo from './Todo';
import React, {useEffect, useState} from "react";
import {
    AppBar,
    Container,
    Grid,
    List,
    Paper,
    Toolbar,
    Typography,
    Button
} from "@mui/material";
import AddTodo from "./AddTodo";
import {call, signout} from "./service/ApiService";
import {Link} from "react-router-dom";


function App() {

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        call("/todo", "GET", null)
            .then((response) => {
                setItems(response.data);
                setLoading(false);
            });


        // const requestOptions = {
        //     method : "POST",
        //     headers : {
        //         "Content-Type": "application/json",
        //     }
        // };
        //
        // fetch("http://localhost:8080/todo", requestOptions)
        //     .then((response) => response.json())
        //     .then(
        //         (response) => {
        //             setItems(response.data);
        //         },
        //         (error) => {
        //
        //         }
        //     );

    }, {});


    const editItem = (item) => {
        call("/todo", "PUT", item)
            .then((response) => setItems(response.data));
        // setItems([...items]);
    }

    const deleteItem = (item) => {
        call("/todo", "DELETE", item)
            .then((response) => setItems(response.data));

        // // 삭제할 아이템을 찾는다.
        // const newItems = items.filter(e => e.id !== item.id);
        // // 삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다.
        // setItems([...newItems]);

    }

    const addItem = (item) =>{
        call("/todo", "POST", item)
            .then((response) => setItems(response.data));
        // item.id = "ID-" + items.length; // key를 위한 id
        // item.done = false; // done 초기화
        // // update는 반드시 setItes로하고 새 배열을 만들어야 한다.
        // setItems([...items, item]);
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

    //navigationBar add
    let navigationBar = (
        <AppBar position="static">
            <Toolbar>
                <Grid justify-content="space-between" container>
                    <Grid item>
                        <Typography variant="h6">할일</Typography>
                    </Grid>
                    <Grid item>
                        <Link to="/sr" variant="body2">
                            <Typography variant="h6">SR</Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" raised="true" onClick={signout}>
                            로그아웃
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );

    /* 로딩중이 아닐 때 렌터링 할 부분*/
    let todoListPage = (
        <div>
            {navigationBar} {/* 네비게이션 바 렌더링 */}
            <Container maxWidth="md">
                <AddTodo addItem={addItem} />
                <div className="TodoList">{todoItems}</div>
            </Container>
        </div>

    );

    /* 로딩중일때 렌터링 할 부분 */
    let loadingPage = <h1> 로딩중 ... </h1>;
    let content = loadingPage;

    if(!loading){
        /*로딩중이 아니면 todolistPage를 선택       */
        content = todoListPage;
    }

    return <div className="App">{content}</div>;


    // return (
    //     <div className="App">
    //         {navigationBar} {/* 네비게이션 바 렌더링 */}
    //         <Container maxWidth="md">
    //             <AddTodo addItem={addItem} />
    //             <div className="TodoList">{todoItems}</div>
    //         </Container>
    //     </div>
    // );

}

export default App;
