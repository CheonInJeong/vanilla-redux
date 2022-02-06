import { createStore } from "redux";
 
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerHTML = 0;

const ADD= "ADD";
const MINUS ="MINUS";

//redux : chage my data, whaterver it returns, that is my data of my application
const countModifier = (count = 0, action) => { //count is state
  console.log(count,action)
  switch (action.type) {
    case ADD: 
      return count + 1;
    case MINUS : 
      return count - 1;
    default:
      return count
  }
  if (action.type === "ADD") {
    console.log("they are telling me to add one")
    return count + 1;
  } else if(action.type==="MINUS") {
    return count - 1 ;
  } else {
    return count;
  }
};
//store : store is where i put data. reducer is function that modify my data 
const countStore = createStore(countModifier); //

//through dispatch, i can send a message to redux what the redux will do. 
add.addEventListener("click", ()=>{ countStore.dispatch({type:ADD})});
minus.addEventListener("click", ()=> countStore.dispatch({type:MINUS}));
//subscribe let us listen 

const onChange =() => {
  console.log("there was a change on the store. current state is ",countStore.getState());
  number.innerHTML = countStore.getState();
}
countStore.subscribe(onChange);

//todos
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul")

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//create action
const addTodo = (text) => {
  return {
    type:ADD_TODO,
    text
  }
}
const deleteTodo = (id) => {
  return { 
    type:DELETE_TODO, 
    id 
  }
}

//NEVER MUTATE STATE> don't use state.push(action.text)
//instead of mutating state, just create a new array 
const reducer = (state=[],action)=> {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text , id : Date.now() }];
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    default:
      return [];

  }
}
const store = createStore(reducer);
store.subscribe(()=>console.log(store.getState()));

const paintTodos =() => {
  const todos = store.getState();
  ul.innerHTML ='';
  todos.forEach(todo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText="DEL";
    btn.addEventListener("click", dispatchDeleteTodo);

    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}
store.subscribe(paintTodos);

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id))
}

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
}

const onSubmit = e => {
  e.preventDefault();
  const todo = input.value;
  input.value='';
  dispatchAddTodo(todo)

}

form.addEventListener("submit", onSubmit);