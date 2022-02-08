import React, {Component} from 'react';
import { variables } from '../../Variables';
import { NavLink } from 'react-router-dom';

export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            modalTitle: "",
            Id: 0,
            Name: "",
            Price: "",
            CategoryId: "",
            PhotoName: "piesel2.png",
            PhotoPath: variables.PHOTO_URL,

            CategoryNameFilter: "",
            categoriesWithoutFilter: []
        }
    }
    
    refreshList() {
        fetch(variables.API_URL + 'product/' + this.props.match.params.name)
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

    componentWillReceiveProps()
    {
        this.refreshList();
        window.location.reload(false);
    }

    render() {
        const {
            categories: categories,
            products: products,
            modalTitle,
            Id,
            Name,
            Price,
            CategoryId,
            PhotoName,
            PhotoPath
        } = this.state;

        return (
            <section className="body">
            <div>
                <ul className="products">
                    {products.map(prod =>
                        <li key={prod.Id}>
                            <div className="product">
                                <a>
                                <NavLink to={'/productdetails/' + prod.Id}>
                                    <img width="250px" height="250px" src={PhotoPath + prod.PhotoName} />
                                </NavLink>
                                <p>
                                <NavLink to={'/productdetails/' + prod.Id}>
                                    {prod.Name}
                                </NavLink></p>
                                </a>
                                <div className="product-price">
                                    <div>{prod.Price}$</div>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            </section>
        )
    }
}
