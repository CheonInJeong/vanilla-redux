import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

function Detail({todos}) {
    const id = useParams().id;
    console.log(id)
    const todo = todos.find(todo=> todo.id === parseInt(id));
    console.log(todo);
    return (
  <>
    <h1>detail </h1>
    {todo?.text} created at {todo?.id}
  </>
  );
}

function mapStateToProps(state/*, ownProps*/) {
    //ownProps doesn't work anymore 
    /*console.log(ownProps);
    const {
        match : {
            params :{ id }
            }
        } = ownProps;
    return {todo : state.find(todo => todo.id === parseInt(id))}*/ 
    return {todos : state}
}

export default connect(mapStateToProps,null)(Detail);
