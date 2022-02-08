import React, {Component} from 'react';
import { variables } from '../../Variables';

export class Payment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            payments: [],
            products: [],
            modalTitle: "",
            Id: 0,
            Name: "",
            CartPrice: ""
        }
    }
    
    refreshList() {
        fetch(variables.API_URL + 'payment')
            .then(response => response.json())
            .then(data => {
                this.setState({ payments: data });
            });

        fetch(variables.API_URL + 'cart/price')
            .then(response => response.json())
            .then(data => {
                this.setState({ CartPrice: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentWillReceiveProps()
    {
        this.refreshList();
        window.location.reload(false);
    }

    finishOrder()
    {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'cart/all', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((result) => {
                alert("Thank you for visiting our shop");
                window.location.href='/home/all';
            }, (error) => {
                alert('Failed');
            })
        }
    }
   
    render() {
        const {
            payments: payments,
            products: products,
            CartPrice: CartPrice
        } = this.state;

        return (
            <section className="body">
                <p id="page-name">Payment</p>
                <div id="payment-layout">
                <div id="payment-layout-col">
                <br />
                <p id="delivery-txt">Choose payment option</p>
                    <table className="table-payment">
                        <tbody>
                            {payments.map(emp =>
                                <tr key={emp.Id}>
                                    <td><input name="payment-option" type="radio" checked></input>
                                    <label for="payment-option" id="payment-option">{emp.Name}</label>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>         
                </div>
                <div id="payment-layout-col">
                    <br />
                    <p id="delivery-txt">Summary</p>
                        <ul className="summary">
			     			<li className="flex justify-between"><span className="text-sum">Cart cost: </span><span className="price">{CartPrice}$</span></li>
			     			<li className="flex justify-between"><span className="text-sum">Delivery: </span><span className="price">{localStorage.getItem("delivery")}$</span></li>
                             &#x2015;&#x2015;&#x2015;&#x2015;&#x2015;&#x2015;&#x2015;&#x2015;&#x2015;&#x2015;
                            <div className="flex justify-between"><span className="text-sum">Total: </span><span className="price">{parseFloat(CartPrice) + parseFloat(localStorage.getItem("delivery"))}$</span></div>
			    	 	</ul>
                </div>
            </div> 
            <p><button type="submit" className="button-style" onClick={this.finishOrder}>Finish</button></p>
            <br />
            </section>
        )
    }
}
