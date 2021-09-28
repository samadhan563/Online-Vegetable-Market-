package com.app.ovm.services.classes;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ovm.dao.ICategoryRepository;
import com.app.ovm.pojos.entity.Category;
import com.app.ovm.services.interfaces.ICategoryService;
@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService {
	
	@Autowired
	private ICategoryRepository categoryRepository;

	@Override
	public List<Category> fetchAllCategorys() {

		return categoryRepository.findAll();
	}

	@Override
	public Category fetchCategoryById(int categoryId) {
		return categoryRepository.findById(categoryId).get();
	}


	@Override
	public Category addCategory(String catName, String url) {
		Category category=new Category(catName,url);
		return categoryRepository.save(category);
	}

	@Override
	public Category updateOldCategory(Category category, int categoryId) {
		Category oldCategory = categoryRepository.findById(categoryId).get();
		oldCategory.setCategoryName(category.getCategoryName());
		oldCategory.setProducts(category.getProducts());
		return categoryRepository.save(oldCategory);
	}

	@Override
	public Category deleteCategory(int categoryId) {
		Category category = categoryRepository.findById(categoryId).get();
		 categoryRepository.deleteById(categoryId);
		 return category;
	}


}
