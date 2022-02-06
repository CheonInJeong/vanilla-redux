import { createStore } from "redux";
 
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerHTML = 0;

//redux : chage my data, whaterver it returns, that is my data of my application
const countModifier = (count = 0, action) => { //count is state
  console.log(count,action)
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
add.addEventListener("click", ()=>{ countStore.dispatch({type:"ADD"})});
minus.addEventListener("click", ()=> countStore.dispatch({type:"MINUS"}));
//subscribe let us listen 

const onChange =() => {
  console.log("there was a change on the store. current state is ",countStore.getState());
  number.innerHTML = countStore.getState();
}
countStore.subscribe(onChange)