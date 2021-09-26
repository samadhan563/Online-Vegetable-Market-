package com.app.ovm.services.interfaces;

import java.util.List;

import com.app.ovm.pojos.entity.Category;

public interface ICategoryService {

	List<Category> fetchAllCategorys();

	Category fetchCategoryById(int categoryId);

	Category addCategory(String catName, String url);

	Category updateOldCategory(Category Category, int categoryId);

	Category deleteCategory(int categoryId);

}
