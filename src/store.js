import { createStore } from 'redux';
//little challange : save todo at localstorage
const ADD = "ADD";
const DELETE ="DELETE";

//action creator
const addTodo = text => {
    return {
        type : ADD,
        text
    }
}

//action creator
const deleteTodo = id => {
    return {
        type : DELETE,
        id : parseInt(id)
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [{ text : action.text, id : Date.now()}, ...state];
        case DELETE:
            return state.filter(todo => todo.id!== action.id);
        default:
            return state;
    }
}

const store = createStore(reducer);

export const actionCreators = {
    addTodo,
    deleteTodo
}

export default store;