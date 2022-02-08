import React, { Component } from 'react';
import { variables } from '../../Variables.js';
import '../../Styles.css';

export class ProductDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: [],
            opinions: [], 
            modalTitle: "",
            PhotoName: "",
            PhotoPath: variables.PHOTO_URL,
            Contents: "",
            IsAnnonymous: false
        }
    }

    refreshList() {

        fetch(variables.API_URL + 'product/one/' + this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ product: data });
            });

        fetch(variables.API_URL + 'opinion/' + this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ opinions: data });
            });
    }

    addToCart() {
        fetch(variables.API_URL + 'cart/' + this.props.match.params.id,{
            method: "POST",
            credentials: 'include'
        })
            .then(response => response.json());
    }

    addToFavorite() {
        fetch(variables.API_URL + 'favorite/' + this.props.match.params.id, {
            method: "POST",
        })
            .then(response => response.json());
    }
    saveOpinionTxt = (e) =>{
        this.setState({Contents: e.target.value });
    }
    saveIsAnnonymous = (e) =>{    
        this.setState({IsAnnonymous: e.target.checked });    
    }

    createClick = () => {
        let today = new Date()
        let date = today.getDate() + '-' + (today.getMonth() + 1) +'-' + today.getFullYear();
        fetch(variables.API_URL + 'opinion', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Contents: this.state.Contents,
                IsAnonymuous: this.state.IsAnnonymous,
                Date: date,
                ProductId: this.props.match.params.id
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert("Added succesfully");
                console.log(result)
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    componentDidMount() {
        this.refreshList();
    }
    setAutohor(author){
        if(author === true){
            return 'Anonymous'
        }
        else{
            return 'User123'
        }
    }
    render() {
        const {
            product,
            opinions, 
            modalTitle,
            PhotoName,
            PhotoPath,
            Contents,
            IsAnnonymous
        } = this.state;

        return (
            <section className="body">
                <div className="top-rows">
                <h5 className="modal-title">{modalTitle}</h5>
                <div className="prod-details-img">
                    {product.map(emp => 
                        <p key={emp.Id}>
                            <img width="350px" height="300px" src={PhotoPath + emp.PhotoName}/>
                        </p>
                    )}
                </div>
                <div className="prod-details-det">
                    <div id="border">
                        {product.map(emp => 
                        <p key={emp.Id}>
                            <p id="prod-name"><strong>{emp.Name}</strong></p>
                            <p id="prod-price" fontWeight="bold">{emp.Price}$</p>
                        </p>
                        )}
                        <p><button className="button-style" onClick={() => this.addToCart()}>Add to cart</button></p>
                        <p><button className="button-style" onClick={() => this.addToFavorite()}>Add to favorites</button></p>
                    </div>
                </div> 
            </div>
            <div className="opinion">
                <p id="opinion-title">Add your opinion</p>
                <p><textarea id="opinion-text" value={Contents} onChange={this.saveOpinionTxt} rows="7" cols="100" maxLength="300" required placeholder='Type your product opinion'></textarea></p>
                <div className="opinion-buttons">
                    <input name="anonymous" type="checkbox" onChange={this.saveIsAnnonymous} value={IsAnnonymous}></input>
                    <label for="anonymous" id="anonymous">Anonymous</label>
                    <button className="button-style" onClick={this.createClick}>Send</button>
                </div>
            </div>
            <div>
            {opinions.length !== 0 && (
            <section className="all-opinions"> 
            <p id="opinion-title">Opinions</p>
            <table className="table-opinions">
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Opinion
                            </th>
                            <th>
                                Author
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {opinions.map(emp => 
                            <tr key={emp.Id}>
                                <td>{emp.Date}</td>
                                <td>{emp.Contents}</td>
                                <td>
                                    {this.setAutohor(emp.IsAnonymuous)}
                                </td> 
                            </tr>
                        )}
                    </tbody>
                </table>
                <br />
                <br />
            </section>)}
            {opinions.length === 0 && <p id="page-name">No opinions for this product</p>}
            <br />
            <br />
            </div>
            </section>
        )
    }
}