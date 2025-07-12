import { Category } from "./category.model";
import { TCreateCategory } from "./category.validation";

const createCategory = async (data: TCreateCategory) => {
  const category = await Category.create(data);
  return category;
};

const getCategories = async () => {
  const categories = await Category.find().lean();
  return categories;
};

export const CategoryService = {
  createCategory,
  getCategories,
};
