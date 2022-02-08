import React, {Component} from 'react';
import { variables } from '../../Variables';

export class Delivery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deliveries: [],
            products: [],
            modalTitle: "",
            Id: 0,
            Name: "",
            Price: ""
        }
    }
    
    refreshList() {
        fetch(variables.API_URL + 'delivery')
            .then(response => response.json())
            .then(data => {
                this.setState({ deliveries: data });
            });

        fetch(variables.API_URL + 'product')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }
    saveDeliveryCost = (e) => {
        localStorage.setItem("delivery", e);
    }

    componentWillReceiveProps()
    {
       this.refreshList();
       window.location.reload(false);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        window.location.href='/payment'
    }
   
    render() {
        const {
            deliveries: deliveries,
            products: products
        } = this.state;

        return (
            <section className="body">
                <div>
                <p id="page-name">Delivery</p>
                <div class="wrapper">
                <div class="container">
                        <form onSubmit={this.handleSubmit}>
                        <h1 id="form-header">
                            Shipping Details
                        </h1>
                        <div class="name">
                            <div>
                                <label for="name">Name</label>
                                <input type="text" name="name" required minLength={1} maxLength={20} autoFocus/>
                            </div>
                            <div>
                                <label for="surname">Surname</label>
                                <input type="text" name="surname" required minLength={1} maxLength={30}/>
                            </div>
                        </div>
                        
                        <div class="address-info">
                            <div class="street">
                                <label for="name">Street</label>
                                <input type="text" name="street" required maxLength={20}/>
                            </div>
                            <div>
                                <label for="house">Number</label>
                                <input type="text" name="house" required/>
                            </div>
                        </div>
                        <div class="address-info">
                        <div>
                            <label for="city">City</label>
                            <input type="text" name="city" required maxLength={30}/>
                        </div>
                        <div>
                                <label for="zip">Zip Code ##-###</label>
                                <input type="text" name="zip" required pattern="^\d{2}-\d{3}$"/>
                            </div>
                        </div>
                        
                        <h1 id="form-header">
                            Contact
                        </h1>
                        <div className="form-contact">
                            <div class="cc-num">
                                <label for="email">E-mail</label>
                                <input type="email" name="email" required/>
                            </div>
                            <div className="cc-info">
                                <div>
                                    <label for="phonenum">Phone ###-###-###</label>
                                    <input type="tel" name="phonenum" required pattern="^[2-9]\d{2}-\d{3}-\d{3}$"/>
                                </div>
                            </div>
                        </div>
                        <div className ="delivery-option"> 
                        <br />
                        <br />
                            <p id="delivery-txt">Delivery option</p>
                            <table className="table-delivery">
                                <thead>
                                    <tr>
                                    <th></th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deliveries.map(emp =>
                                    <tr key={emp.Id}>
                                        <td><input name="delivery-option" type="radio" onChange={() => this.saveDeliveryCost(emp.Price)}></input>
                                        <label for="delivery-option" id="delivery-option">{emp.Name}</label></td>
                                        <td>{emp.Price}$</td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>   
                        </div>
                        <br />
                            <button type="submit" className="button-style">Go to payment</button>
                        <br />
                    </form>
                </div>
            </div>
            </div>
            </section>
        )
    }
}
