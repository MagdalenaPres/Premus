import React, {Component} from 'react';
import { variables } from '../../Variables';

export class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opinions: [],
            products: [],
            modalTitle: "",
            Id: "",
            Contents: "",
            IsAnnonymous: "",
            Date: "",
            ProductId: ""
        }
    }
    
    refreshList() {
        fetch(variables.API_URL + 'opinion')
            .then(response => response.json())
            .then(data => {
                this.setState({ opinions: data });
            });

        fetch(variables.API_URL + 'product')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
            });
    }
    editClick(emp) {
        this.setState({
            modalTitle: "Edit Opinion",
            Date: emp.Date,
            Id: emp.Id,
            Contents: emp.Contents,
            IsAnnonymous: emp.IsAnnonymous,
            ProductId: emp.ProductId
        });
    }
    changeContents = (e) => {
        this.setState({ Contents: e.target.value });
    }
    changeIsAnnonymous = (e) => {
        console.log(e.target.value)
        this.setState({ IsAnnonymous: e.target.value });
    }
    updateClick() {
        fetch(variables.API_URL + 'opinion', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.state.Id,
                Contents: this.state.Contents,
                IsAnnonymous: this.state.IsAnnonymous,
                Date: this.state.Date,
                ProductId: this.state.ProductId
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
            fetch(variables.API_URL + 'opinion/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert("Deleted properly");
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    componentWillReceiveProps()
    {
        this.refreshList();
        window.location.reload(false);
    }

    render() {
        const {
            opinions: opinions,
            products: products,
            modalTitle,
            Id,
            Contents
        } = this.state;

        return (
            <section className="body">
            <div id="photo-account">
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            </div>
            <div id="user-name">
                user
            </div>
            <div>
            <table className="table-opinions">
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Product
                            </th>
                            <th>
                                Opinion
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {opinions.map(emp =>
                            <tr key={emp.Id}>
                                <td> {emp.Date} </td>
                                <td> {emp.Product.Name} </td>
                                <td>{emp.Contents}</td>
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
                <br />
                <br />
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
                                            <span className="input-group-text">Opinion</span>
                                            <textarea className="form-control"
                                                value={Contents}
                                                onChange={this.changeContents} />
                                        </div>                                   
                                    </div>
                                </div>

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
