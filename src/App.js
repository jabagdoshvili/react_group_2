import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsId: ['Water', 'Computer'],
      buyItems: ['Milk', 'Bread', 'Fruit'],
      message: ''
    }
  }


  addItem(e) {
    e.preventDefault();
    const {itemsId} = this.state;
    const {buyItems} = this.state;
    const newItem = this.newItem.value;

    const isOnTheList = buyItems.includes(newItem);

    if(isOnTheList) {

      this.setState ({
        message: 'This item is already on the list!'
      })

    } else {
      newItem !== '' && this.setState({
        buyItems: [...this.state.buyItems, newItem],
        message: ''
      })
    }

    this.addForm.reset();
  }


  removeItem (item) {
      const newBuyItems = this.state.buyItems.filter(buyItems => {
        return buyItems !== item;
      })

      this.setState({
        buyItems: [...newBuyItems]
      })

      if(newBuyItems.length === 0) {
        this.setState ({
          message: 'No Items, Add Some!'
        })
      }
  } 

  render() {
    const {buyItems, message} = this.state
    const {itemsId} = this.state
    return (
      <div>
        <header>
          <h1>Shopping List</h1>

          <form ref={input => this.addForm = input} className="form-inline" onSubmit={(e) => {this.addItem(e)}}>
            <div className="form-group">
              <label className="add-item">Add New Item</label>
              <input ref={input => this.newItem = input} type="text" placeholder="Bread" className="form-control" />
            </div>
            <div className="form-group">
              <label className="choose-id">choose ID</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>{itemsId}</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>

        </header>

        {
          (message !== '' || buyItems.length === 0)  && <p className="message text-danger">{message}</p>
        }
        {
          buyItems.length > 0 &&
          <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Item</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {

          buyItems.map(item => {
            return (
              <tr key={item}>
                <th>{itemsId}</th>
                <td>{item}</td>
                <td>
                  <button  onClick={(e) => this.removeItem(item)} type="button" className="btn btn-danger">Remove</button>
                </td>
              </tr>
            )
          })

          }
          </tbody>
      </table>
        }
      </div>
    )
  }
}


