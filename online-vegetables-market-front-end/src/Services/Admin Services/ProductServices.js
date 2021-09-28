import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/api/product';
class ProductServices {
    AddProductByCategory(catId, product) {
        return axios.post(USER_API_BASE_URL + '/add-new-product/' + catId, product);
    }

    updateProduct(id, product) {
        return axios.put(USER_API_BASE_URL + '/update-product/' + id, product);
    }

    getAllProducts() {
        return axios.get(USER_API_BASE_URL + "/fetch-all-products");
    }
    loadNewProducts() {
        return axios.get(USER_API_BASE_URL + "/get-latest-product");
    } 

    getProductById(id) {
        return axios.get(USER_API_BASE_URL + "/get-product-by-id/" + id);
    }
    getProductByName(name) {
        return axios.get(USER_API_BASE_URL + "/get-product-by-name/" + name);
    }
    getAllProductsByCatId(catId) {
        return axios.get(USER_API_BASE_URL + "/fetch-product-by-cat-id/" + catId);
    }
    deleteProduct(prodId) {
        return axios.delete(USER_API_BASE_URL + "/remove-product/" + prodId);
    }
    async fileUpload(file) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return await axios.post('http://localhost:8080/api/image/upload', file, config);
    }

    loadAllOrders(){
        return axios.get("http://localhost:8080/api/order/fetch-all-orders" );
    }
    acceptOrder(id){
        return axios.get("http://localhost:8080/api/order/accept-order/"+id );
    }

    deliveredOrder(id){
        return axios.get("http://localhost:8080/api/order/delived-order/"+id );
    }



}
export default new ProductServices();
