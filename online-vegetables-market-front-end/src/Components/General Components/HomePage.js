import React, { useEffect, useState } from 'react';
import CategoryServices from '../../Services/Admin Services/CategoryServices';
// import AllServices from '../../Services/AllServices';
import Navbar from './../Animation Component/Navbar';

function HomePage(props) {

  const [categories, setCategories] = useState([]);
  const getAllCategories = () => {
    CategoryServices.getAllCategories().then((res) => {
      console.log(JSON.stringify(res.data));
      setCategories(res.data);
      console.log(JSON.stringify(categories));
    })
  }

  const showProducts = (catId, catName) => {
    props.history.push(`show-products-under-category/${catId}/${catName}`);
  }
  const tempUser = () => {
    let size = JSON.parse(window.localStorage.getItem("cart_size"))
    if (size === null)
      JSON.stringify(window.localStorage.setItem("cart_size", 0));
    if (size !== null)
      JSON.stringify(window.localStorage.setItem("cart_size", size));

    let uId = JSON.parse(window.localStorage.getItem("user_id"))
    if (uId === null) {
      JSON.stringify(window.localStorage.setItem("user_id", 9999));
      JSON.stringify(window.localStorage.setItem("status", false));
    }
    if (uId !== null)
      JSON.stringify(window.localStorage.setItem("user_id", uId));
  }


  useEffect(() => {
    tempUser();
    getAllCategories();
    // fetchAllProducts();
  }, []);
  return (
    <div style={{ backgroundImage: `url(${''})` }} >
    <Navbar />
      <div className="row ml-2 mt-2 mb-2 mr-2 ">

        <div className="col mt-0 mb-0">
          <div className="card-mb-3 mt-0 content">
            <div className="card-header ">
              <h2 className="text-center">Categories</h2>
            </div>
            <div className="card-body ">
              <div className="row row-cols-1 row-cols-md-4 g-4 ">
                {
                  categories.length > 0 && categories.map(category =>
                    <div key={category.id}>
                      <div className="col">
                        <div className="card border border-dark mt-3 mb-2">
                          <button className="btn btn-outline-info custom-btn" onClick={() => showProducts(category.id, category.categoryName)} >
                            <div className="text-center">
                              <img className="card-img-top float-center  " src={category.categoryImage} alt="..." style={{ height: "300px" }} />
                            </div>
                            <div class="card-body">
                              <h4 className="card-title text-center">{category.categoryName}</h4>
                              {/* <h5 className="card-text">{category.categoryName}</h5> */}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
