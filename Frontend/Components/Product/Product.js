import React, { Component } from 'react';
import { variables } from '../../Variables.js';

export class Product extends Component {

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

        fetch(variables.API_URL + 'product')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
            });

        fetch(variables.API_URL + 'category')
            .then(response => response.json())
            .then(data => {
                this.setState({ categories: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeName = (e) => {
        this.setState({ Name: e.target.value });
    }
    changeCategory = (e) => {
        this.setState({ CategoryId: e.target.value});
    }
    changePrice = (e) => {
        this.setState({ Price: e.target.value });
    }
    changeAvailability = (e) => {
        this.setState({ IsAvailable: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Product",
            Name: "",
            Price: "",
            IsAvailable: "true",
            CategoryId: 9,
            PhotoName: "piesel2.jpg"
        });
    }
    editClick(emp) {
        this.setState({
            modalTitle: "Edit Product",
            Id: emp.Id,
            Name: emp.Name,
            Price: emp.Price,
            IsAvailable: emp.IsAvailable,
            CategoryId: emp.CategoryId,
            PhotoName: emp.PhotoName
        });
    }

    createClick() {
        fetch(variables.API_URL + 'product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: this.state.Name,
                Price: this.state.Price,
                IsAvailable: this.state.IsAvailable,
                CategoryId: this.state.CategoryId,
                PhotoName: this.state.PhotoName
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'product', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.state.Id,
                Name: this.state.Name,
                Price: this.state.Price,
                IsAvailable: this.state.IsAvailable,
                CategoryId: this.state.CategoryId,
                PhotoName: this.state.PhotoName
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'product/' + id, {
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

    imageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + 'product/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ PhotoName: data });
            })
    }

    render() {
        const {
            categories: categories,
            products: products,
            modalTitle,
            Id,
            Name,
            Price,
            IsAvailable,
            CategoryId,
            PhotoName,
            PhotoPath
        } = this.state;

        return (
            <section className="body">
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Product
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Is Available
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
                                <td>{emp.Id}</td>
                                <td>{emp.Name}</td>
                                <td>{emp.Price}</td>
                                <td>{emp.IsAvailable.toString()}</td>
                                <td>{emp.Category.Name}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(emp)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(emp.Id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Name</span>
                                            <input type="text" className="form-control"
                                                value={Name}
                                                onChange={this.changeName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Price</span>
                                            <input type="text" className="form-control"
                                                value={Price}
                                                onChange={this.changePrice} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Is Available</span>
                                            <input type="text" className="form-control"
                                                value={IsAvailable}
                                                onChange={this.changeAvailability} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Category</span>
                                            <select className="form-select"
                                                onChange={this.changeCategory}
                                                value={CategoryId}>
                                                {categories.map(dep => <option key={dep.Id}>
                                                    {dep.Id}
                                                </option>)}
                                            </select>
                                        </div>

                                    </div>

                                    <div className="p-2 w-50 bd-highlight">
                                        <img width="250px" height="250px"
                                            src={PhotoPath + PhotoName} />
                                        <input className="m-2" type="file" onChange={this.imageUpload} />
                                    </div>
                                </div>

                                {Id == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {Id != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            </section>
        )
    }
}