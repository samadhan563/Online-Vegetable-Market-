import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Animation Component/Navbar";
import LoginPage from "./Components/CommonComponents/LoginPage";
import HomePage from './Components/General Components/HomePage';
import RegistrationPage from "./Components/CommonComponents/RegistrationPage";
import ViewProfilePage from "./Components/CommonComponents/ViewProfilePage";
import UpdateProfilePage from "./Components/CommonComponents/UpdateProfilePage";
import AddCategoryComponent from "./Components/Admin Components/AddCategoryComponent";
import AddProductComponent from "./Components/Admin Components/AddProductComponent";
import ShowAllProductsUnderCategory from './Components/Admin Components/ShowAllProductsUnderCategory';
import ViewProductsDetails from "./Components/Admin Components/ViewProductsDetails";
import UpdateProductComponent from './Components/Admin Components/UpdateProductComponent';
import ProductUnderCategory from './Components/CommonComponents/ProductUnderCategory';
import OrderNow from "./Components/CustomerComponent/OrderNow";
import Cart from './Components/CustomerComponent/Cart';
import AllProducts from './Components/CommonComponents/AllProducts';
import Contact from './Components/CommonComponents/Contact';
import UserProfile from './Components/CommonComponents/UserProfile';
import UserAddress from './Components/CustomerComponent/UserAddress';
import LogoutPage from './Components/CommonComponents/LogoutPage';
import OrderHistory from "./Components/CustomerComponent/OrderHistory";
import OrderDetails from './Components/CustomerComponent/OrderDetails';
import ProductsDetails from './Components/CommonComponents/ViewProductsDetails';
import AdminHomePage from './Components/Admin Components/AdminHomePage';
import ShowAllProducts from "./Components/Admin Components/ShowAllProducts";
import PageNotFound from "./Components/General Components/PageNotFound";
import AllOrders from "./Components/Admin Components/AllOrders";
import SpecifiedOrderDetails from './Components/Admin Components/SpecifiedOrderDetails';
function App() {
  return (
    <div>
      <Router>
        <div >          
          <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/home-page' exact component={HomePage} />
              <Route path='/contact-page' component={Contact} />

              {/* General Components */}
              <Route path='/login-page' exact component={LoginPage} />
              <Route path='/logout-page' component={LogoutPage} />
              <Route path='/registration-page' component={RegistrationPage} />
              <Route path='/show-products-details/:id/:name' component={ProductsDetails} />

              <Route path='/user-profile-page' component={UserProfile} />
              <Route path='/order-details/:id' component={OrderDetails} />
              <Route path='/order-history' component={OrderHistory} />
              <Route path='/user-address-page' component={UserAddress} />
              <Route path='/view-profile-page' component={ViewProfilePage} />
              <Route path='/update-profile-page' component={UpdateProfilePage} />


              <Route path='/all-products' component={AllProducts} />
              <Route path='/show-products-under-category/:catId/:catName' component={ProductUnderCategory} />
              <Route path="/cart" component={Cart} />
              <Route path='/order-now' component={OrderNow} />


              {/* footer page component */}
              <Route path='/about-us-page' component={HomePage} />
              <Route path='/contact-us-page' component={HomePage} />
              <Route path='/services-page' component={HomePage} />
              <Route path='/term-and-condition' component={HomePage} />
            
            
            {/*Admin part*/}
            
              
                <Route path='/add-category-page' component={AddCategoryComponent} />
                <Route path='/admin-home'  component={AdminHomePage} />
                <Route path='/add-product-page/:id' component={AddProductComponent} />
                <Route path="/show-all-products" component={ShowAllProducts}/>
                <Route path='/product-under-category/:id' component={ShowAllProductsUnderCategory} />
                <Route path='/admin-product-under-category/:id' component={ShowAllProductsUnderCategory} />
                <Route path='/view-product-details/:id' component={ViewProductsDetails} />
                <Route path='/update-product-details/:id' component={UpdateProductComponent} />
                <Route path='/all-orders' component={AllOrders} />
                <Route path='/specific-order-details/:id' component={SpecifiedOrderDetails} />
                <Route path='/**' component={PageNotFound} />
                
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;
