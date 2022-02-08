import './App.css';
import {Home} from './Components/Home/Home';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { NavBar } from './Components/NavBar/NavBar';
import { ProductDetails } from './Components/ProductDetails/ProductDetails';
import { Cart } from './Components/Cart/Cart';
import { Favorite } from './Components/Favorite/Favorite';
import { Account } from './Components/Account/Account';
import { Delivery } from './Components/Delivery/Delivery';
import { Payment } from './Components/Payment/Payment';
import './Styles.css';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h3 className="title">PremusShop</h3>
      <NavBar />
          <Route path="/home/:name" component={Home} />
          <Route path="/productdetails/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
          <Route path="/favorite" component={Favorite} />
          <Route path="/account" component={Account} />
          <Route path="/delivery" component={Delivery} />
          <Route path="/payment" component={Payment} />
    </div>
    </BrowserRouter>
  );
}

export default App;
