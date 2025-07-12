import AppError from "../../errors/AppError";
import { codeGenerator } from "../../utils/codeGenerator";
import { Category } from "../Category/category.model";
import { Product } from "./product.model";
import { TCreateProduct } from "./product.validation";

//Create product
const createProduct = async (data: TCreateProduct) => {
  const existCategory = await Category.findOne({ _id: data.category });

  if (!existCategory) {
    throw new AppError(404, "Category does not exist");
  }

  const productCode = codeGenerator(data.name);
  data.productCode = productCode;

  try {
    const product = await Product.create(data);
    return product;
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.productCode) {
      throw new AppError(400, "Product code already exists. Please try again.");
    }
    throw error;
  }
};

// Get all products
const getProducts = async (productQuery: {
  categoryId: string;
  searchKey: string;
}) => {
  const { categoryId, searchKey } = productQuery;
  const query: any = {};

  if (categoryId) {
    query.category = categoryId;
  }
  if (searchKey) {
    query.name = { $regex: searchKey, $options: "i" };
  }

  const products = await Product.find(query)
    .populate("category", "name")
    .lean();

  const formattedProducts = products.map((product) => {
    const finalPrice = product.price - (product.price * product.discount) / 100;
    return {
      ...product,
      finalPrice,
    };
  });
  return formattedProducts;
};

//update product
const updateProduct = async (id: string, data: Partial<TCreateProduct>) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("category", "name");

  if (!product) {
    throw new AppError(404, "Product not found");
  }
  return product;
};

export const ProductService = {
  createProduct,
  getProducts,
  updateProduct,
};
