import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/api';
 class CategoryServices  
 {
    addCategory(catName,file)
    {
        const config = {
            headers: {
                 'Content-Type': 'multipart/form-data'
            }
        }
         return axios.post(USER_API_BASE_URL + '/category/add-new-category/'+catName, file,config);
    };
    getAllCategories()
    {
        return axios.get(USER_API_BASE_URL+"/category/fetch-all-category");
    }
    fetchCategoryById(categoryId)
    {
        return axios.get(USER_API_BASE_URL+"/category/fetch-category-by-id/"+categoryId);
    }
    removeCategory(id)
    {
        return axios.delete(USER_API_BASE_URL+"/category/remove-old-category/"+id);
    }
 }
 export default new CategoryServices();

