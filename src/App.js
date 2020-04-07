import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsId: ['Water', 'Computer' , 'Car'],
      buyItems: [{id:1,name:'Milk',category_id:0}, {id:2,name:'bread',category_id:1}, {id:3,name:'Car',category_id:2}],
      message: ''
    }
  }

  
  addItem(e) {
    e.preventDefault();
    const {buyItems} = this.state;
    const newItem = {id:this.state.buyItems.length,name:this.newItem.value,category_id:this.category.value};

    function check(buyItems,title,category){
      let status = false;
      buyItems.find((element)=>{
        status = element.name == title && element.category_id == category;
      });
      return status;
    }
    
    if(check(buyItems,this.newItem.value,this.category.value) == true) {

      this.setState ({
        message: 'ეს პროდუქტი უკვე დამატებული!'
      })

    } else if(this.newItem.value == ''){
      this.setState ({
        message: 'პროდუქტის სახელი არ შეიძლება იყოს ცარიელი!'
      })
    } else {
      this.setState({
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
          message: 'არ არის პროდუქტი, დაამატე!'
        })
      }
  } 

  render() {
    const {buyItems,itemsId, message} = this.state

    let i = 0;
    return (
      <div>
        <header>
          <h1>პროდუქტების სია</h1>
          <form ref={input => this.addForm = input} className="form-inline" onSubmit={(e) => {this.addItem(e)}}>
            <div className="form-group">
              <label className="add-item">დაამატე ახალი</label>
              <input ref={input => this.newItem = input} type="text" placeholder="მაგ. პური" className="form-control" />
            </div>
            <div className="form-group">
              <label className="choose-id">აირჩიე კატეგორია</label>
              <select ref={input => this.category = input} class="form-control" id="exampleFormControlSelect1">
                {itemsId.map(itemsId => <option value={i++}>{itemsId}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">დამატება</button>
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
              <th>კატეგორია</th>
              <th>პროდუქტი</th>
              <th>ქმედება</th>
            </tr>
          </thead>
          <tbody>
        {
          buyItems.map(item => {
        
            return (
              <tr key={item.id}>
                <th>{itemsId[item.category_id]}</th>

                <td>{item.name}</td>
                <td>
                  <button  onClick={(e) => this.removeItem(item)} type="button" className="btn btn-danger">წაშლა</button>
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


