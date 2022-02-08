import { createStore } from 'redux';
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

//little challange : save todo at localstorage

const addTodo = createAction("ADD");
const deleteTodo = createAction("DELETE");

// const reducer = (state = [], action) => {
//     switch (action.type) {
//         case addTodo.type:
//             return [{ text : action.payload, id : Date.now()}, ...state];
//         case deleteTodo.type:
//             return state.filter(todo => todo.id!== action.payload);
//         default:
//             return state;
//     }
// }


//it's ok mutate state when you use redux-toolkit
//there are two options 1. return directly 2.mutate state
//but when you return something, that state must be a new state
const reducer = createReducer([],{
    [addTodo] : (state,action) => { state.push ({ text : action.payload, id:Date.now()})},
    [deleteTodo] : (state,action) => { return state.filter(todo=>todo.id!==action.payload)}
})
//const store = createStore(reducer);
const store = configureStore({reducer})
export const actionCreators = {
    addTodo,
    deleteTodo
}

export default store;