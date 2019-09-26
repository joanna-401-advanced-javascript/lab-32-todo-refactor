import React, { useState, useReducer } from "react";
import uuid from "uuid/v4";
import { When } from "../if";
import Modal from "../modal";

import "./todo.scss";

const initialState = {
  todoList: [],
  item: {},
  showDetails: false,
  details: {},
};

function reducer(state, action){
  switch(action.type){
    case 'change':
      return {...state.item, [action.data.name]: action.data.value };
    case 'add':
      return {...state, todoList: [...state.todoList, action.data], item: {}};
    case 'delete':
      return {...state, todoList: action.data};
    case 'save':
      return {...state, todoList: state.todoList.map(item =>
          item._id === action.data._id ? action.data : item
        )};
    case 'toggle':
      return {...state, details: action.data.details, showDetails: action.data.showDetails};
    default:
      throw new Error();
  }
}

export default function Todo(){
  // const [item, setItem] = useState(initialState.item);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = event => {
    dispatch({type: 'change', data: event.target});
    // setItem({item: {...initialState.item, [event.target.name]: event.target.value} });
  };

  const handleSubmit = event => {
    props.handleSubmit(state.item);
  };

  const addItem = event => {
    event.preventDefault();
    event.target.reset();
    const defaults = { _id: uuid(), complete:false };
    const item = Object.assign({}, initialState.item, defaults);
    dispatch({type: 'add', data: item});
  };

  const deleteItem = id => {
    const filteredList = state.todoList.filter(item => item._id !== id);
    dispatch({type: 'delete', data: filteredList})
  };

  const saveItem = updatedItem => {
    // const updatedList = state.todoList.map(item =>
    //   item._id === updatedItem._id ? updatedItem : item
    // );
    dispatch({type: 'save', data: updatedItem});
  };

  const toggleComplete = id => {
    let item = state.todoList.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      saveItem(item);
    }
  };

  const toggleDetails = id => {
    let showDetails = ! state.showDetails;
    let details = state.todoList.filter( item => item._id === id )[0] || {};
    dispatch({type: 'toggle', data: {details, showDetails} });
    // setState({details, showDetails});
  };

  return (
    <>
      <header>
        <h2>
          There are
          {state.todoList.filter( item => !item.complete ).length}
          Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <h3>Add Item</h3>
          <form onSubmit={addItem}>
            <label>
              <span>To Do Item</span>
              <input
                name="text"
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Difficulty Rating</span>
              <input type="range" min="1" max="5" name="difficulty" defaultValue="3" onChange={handleInputChange} />
            </label>
            <label>
              <span>Assigned To</span>
              <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
            </label>
            <label>
              <span>Due</span>
              <input type="date" name="due" onChange={handleInputChange} />
            </label>
            <button>Add Item</button>
          </form>
        </div>

        <div>
          <ul>
            { state.todoList.map(item => (
              <li
                className={`complete-${item.complete.toString()}`}
                key={item._id}
              >
              <span onClick={() => toggleComplete(item._id)}>
                {item.text}
              </span>
                <button onClick={() => toggleDetails(item._id)}>
                  Details
                </button>
                <button onClick={() => deleteItem(item._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <When condition={state.showDetails}>
        <Modal title="To Do Item" close={toggleDetails}>
          <div className="todo-details">
            <header>
              <span>Assigned To: {state.details.assignee}</span>
              <span>Due: {state.details.due}</span>
            </header>
            <div className="item">
              {state.details.text}
            </div>
          </div>
        </Modal>
      </When>
    </>
  );
}

// class ToDo extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     todoList: [],
  //     item: {},
  //     showDetails: false,
  //     details: {}
  //   };
  // }

  // handleInputChange = e => {
  //   this.setState({ item: {...this.state.item, [e.target.name]: e.target.value} });
  // };

  // handleSubmit = (e) => {
  //   this.props.handleSubmit(this.state.item);
  // };

  // addItem = (e) => {
  //
  //   e.preventDefault();
  //   e.target.reset();
  //
  //   const defaults = { _id: uuid(), complete:false };
  //   const item = Object.assign({}, this.state.item, defaults);
  //
  //   this.setState({
  //     todoList: [...this.state.todoList, item],
  //     item: {}
  //   });
  //
  // };

  // deleteItem = id => {
  //
  //   this.setState({
  //     todoList: this.state.todoList.filter(item => item._id !== id)
  //   });
  //
  // };

  // saveItem = updatedItem => {
  //
  //   this.setState({
  //     todoList: this.state.todoList.map(item =>
  //       item._id === updatedItem._id ? updatedItem : item
  //     )
  //   });
  //
  // };

  // toggleComplete = id => {
  //   let item = this.state.todoList.filter(i => i._id === id)[0] || {};
  //   if (item._id) {
  //     item.complete = !item.complete;
  //     this.saveItem(item);
  //   }
  // };

  // toggleDetails = id => {
  //   let showDetails = ! this.state.showDetails;
  //   let details = this.state.todoList.filter( item => item._id === id )[0] || {}
  //   this.setState({details, showDetails});
  // }

  // render() {
  //
  //   return (
  //     <>
  //       <header>
  //         <h2>
  //           There are
  //           {this.state.todoList.filter( item => !item.complete ).length}
  //           Items To Complete
  //         </h2>
  //       </header>
  //
  //       <section className="todo">
  //
  //         <div>
  //           <h3>Add Item</h3>
  //           <form onSubmit={this.addItem}>
  //             <label>
  //               <span>To Do Item</span>
  //               <input
  //                 name="text"
  //                 placeholder="Add To Do List Item"
  //                 onChange={this.handleInputChange}
  //               />
  //             </label>
  //             <label>
  //               <span>Difficulty Rating</span>
  //               <input type="range" min="1" max="5" name="difficulty" defaultValue="3" onChange={this.handleInputChange} />
  //             </label>
  //             <label>
  //               <span>Assigned To</span>
  //               <input type="text" name="assignee" placeholder="Assigned To" onChange={this.handleInputChange} />
  //             </label>
  //             <label>
  //               <span>Due</span>
  //               <input type="date" name="due" onChange={this.handleInputChange} />
  //             </label>
  //             <button>Add Item</button>
  //           </form>
  //         </div>
  //
  //         <div>
  //           <ul>
  //             { this.state.todoList.map(item => (
  //               <li
  //                 className={`complete-${item.complete.toString()}`}
  //                 key={item._id}
  //               >
  //             <span onClick={() => this.toggleComplete(item._id)}>
  //               {item.text}
  //             </span>
  //                 <button onClick={() => this.toggleDetails(item._id)}>
  //                   Details
  //                 </button>
  //                 <button onClick={() => this.deleteItem(item._id)}>
  //                   Delete
  //                 </button>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       </section>
  //
  //       <When condition={this.state.showDetails}>
  //         <Modal title="To Do Item" close={this.toggleDetails}>
  //           <div className="todo-details">
  //             <header>
  //               <span>Assigned To: {this.state.details.assignee}</span>
  //               <span>Due: {this.state.details.due}</span>
  //             </header>
  //             <div className="item">
  //               {this.state.details.text}
  //             </div>
  //           </div>
  //         </Modal>
  //       </When>
  //     </>
  //   );
  // }
// }

// export default ToDo;
