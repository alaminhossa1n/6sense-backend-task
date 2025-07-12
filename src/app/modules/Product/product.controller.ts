import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.validation";

// Create product
const createProduct = async (req: Request, res: Response) => {
  const validatedData = createProductSchema.parse(req.body);

  const result = await ProductService.createProduct(validatedData);
  res.status(201).json({
    success: true,
    message: "Product Created Successfully",
    result,
  });
};

// Get all products
const getProducts = async (req: Request, res: Response) => {
  // Extract query parameters
  const { categoryId, searchKey } = req.query;

  const products = await ProductService.getProducts({
    categoryId: typeof categoryId === "string" ? categoryId : "",
    searchKey: typeof searchKey === "string" ? searchKey : "",
  });
  res.status(200).json({
    success: true,
    message: "Products Retrieved Successfully",
    data: products,
  });
};

//update product
const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const validatedData = updateProductSchema.parse(data);

  const updatedProduct = await ProductService.updateProduct(id, validatedData);
  res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
    data: updatedProduct,
  });
};

export const ProductController = {
  createProduct,
  getProducts,
  updateProduct,
};
