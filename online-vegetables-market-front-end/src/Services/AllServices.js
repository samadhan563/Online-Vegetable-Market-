import axios from 'axios';
const BASE_URL = "http://localhost:8080/api";

class AllServices {

    /*-----------------------Product services------------------------- */

    // getAllProducts() {
    //     return axios.get(USER_API_BASE_URL + "/fetch-all-products");
    // }
    getProductById(id) {
        return axios.get(BASE_URL + "/product/get-product-by-id/" + id);
    }
    getAllProducts(){
        return axios.get(BASE_URL+ "/product/fetch-all-products");
    }
    userUpdate(productId){
        return axios.post(BASE_URL+ "/update-user-details",productId);
    }
    getDetailsOfLoggedInUser(productId){
        return axios.post(BASE_URL+ "/get-user-by-id",productId);
    }

    
    getAllProductsByCategoryId(catId){
        return axios.get(BASE_URL+ "/product/fetch-product-by-cat-id/"+catId);
    }




    /*-----------------------Category services------------------------- */
    getAllCategories(){
        return axios.get(BASE_URL+ "/category/fetch-all-category");
    }

    // getAllProductsByCategoryId(catId){
    //     return axios.get(BASE_URL+ "/product/get-cat-by-id/"+catId);
    // }






    /*-----------------------Order services------------------------- */
    addOrder(totalPrice, userId) {
        return axios.get(BASE_URL + '/order/add-order/user/' + userId + '/price/' + totalPrice );
    }
    // @GetMapping("/order/add-order/{userId}/price/{totalPrice}/time-slot/{timeSlot}")
    addOrderDetails(userId, orderId) {
        return axios.get(BASE_URL + '/order/order-details/' + userId + '/order-id/' + orderId);
    }

    cancelOrder(orderId){
        return axios.get(BASE_URL + '/order/order-cancel/' + orderId);
    }

    loadRentOrderHistory(userId) {
        return axios.get(BASE_URL + '/order/order-history/' + userId);
    }

    viewOrderDetails(orderId) {
        return axios.get(BASE_URL + '/order/order-details/' + orderId);
    }

    getPaymentDetailsByBookingId(orderId){
        return axios.get(BASE_URL + '/order/get-payment-by-order/'+ orderId);
    }







    /*-----------------------Payment services------------------------- */
  

    addPaymentDetails(codPayment) {
        return axios.post(BASE_URL + '/payment/cod-payment', codPayment);
    }
    addCardDetails(cardPayment) {
        return axios.post(BASE_URL + '/payment/card-payment', cardPayment);
    }







    /*-------------------------Cart Service --------------------------0 */

    updateCartUserId(userId){
        return axios.put(BASE_URL+ "/category/fetch-all-product");
    }

    addProductToCart(productCartId,quantity){
        return axios.post(BASE_URL + "/cart/add-to-cart/quantity/"+quantity, productCartId);
    }

    loadCart(id) {
        console.log(id)
        return axios.get(BASE_URL + "/cart/load-cart-user-id/" + id);
    } 

    getCartByUserId(id) {
        return axios.get(BASE_URL + "/cart/get-cart-user-id/" + id);
    }

    removeFromCart(rentId) {
        return axios.delete(BASE_URL + "/cart/remove-from-cart/" + rentId)
    }

    getCartTotalAmt(userId) {
        return axios.get(BASE_URL + "/cart/get-total-cart-amount/" + userId)
    }

    getCartTotalSavingAmt(userId) {
        return axios.get(BASE_URL + "/cart/get-total-saving-amount/" + userId)
    }

}

export default new  AllServices();
