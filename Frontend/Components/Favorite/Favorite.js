import React, { Component } from 'react';
import { variables } from '../../Variables.js';

export class Favorite extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            modalTitle: "",
            Id: 0,
            Name: "",
            Price: "",
            IsAvailable: "",
            CategoryId: "",
            PhotoName: "piesel2.jpg",
            PhotoPath: variables.PHOTO_URL
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'favorite')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ products: data });
            })


        fetch(variables.API_URL + 'category')
            .then(response => response.json())
            .then(data => {
                this.setState({ categories: data });
            });
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'favorite/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {
            categories: categories,
            products: products,
            PhotoPath
        } = this.state;

        return (
            <section className="body">
            {products.length !== 0 && (
            <div>
            <p id="page-name">Favorites</p>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(emp =>
                            <tr key={emp.Id}>
                                <td><img width="55px" height="45px" src={PhotoPath + emp.Product.PhotoName}/></td>
                                <td>{emp.Product.Name}</td>
                                <td>{emp.Product.Price}</td>
                                <td>{emp.Product.Category.Name}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(emp.Product.Id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </div>)}
            {products.length === 0 && <p id="page-name">No favorite products</p>}
            </section>
        )
    }
}