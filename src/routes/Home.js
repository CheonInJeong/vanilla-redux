import React, { useState } from 'react';
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Todo from '../components/Todo';

function Home({todos,/*dispatch*/addTodo}) {

    const [text, setText] = useState("")
    function onChange(e) {
        setText(e.target.value);
    }
    function onSubmit(e) {
        e.preventDefault();
        /*dispatch(addTodo(text)) //action createor 가 {type:ADD, text}를 리턴해줘서 이 코드는 dispatch({type:ADD, text})와 같음!*/
        addTodo(text);
        setText("");
    }


  return (
  <>
    <h1>Todo</h1>
    <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange}/>
    </form>
    <ul>
        {todos.map(todo=> (
            <Todo {...todo} key={todo.id}/>
        ))}</ul>
  
  </>);
}

function getCurrentState(state) { //it's name should be mapStateToProps ! what a proper name is it!

    //어떤 props를 추가해도 Home components의 props로 전달 됨
    //return {sexy : true};
    return {todos : state};
}

function mapDispatchToProps(dispatch) {
  
    return { addTodo : text => dispatch(actionCreators.addTodo(text))};
    //redux-tolkit을 쓰면 text는 payload안에 위치
}
//connect : Home으로 보내는 props에 추가 될 수 있도록 허용
//connect have two params 1.mapStateToProps 2. mapDispatchToProps
export default connect(getCurrentState,mapDispatchToProps) (Home);
