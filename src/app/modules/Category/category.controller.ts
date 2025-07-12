import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";
import { createCategorySchema } from "./category.validation";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = createCategorySchema.parse(req.body);

    const result = await CategoryService.createCategory(validatedData);
    res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await CategoryService.getCategories();
    res.status(200).json({
      success: true,
      message: "Categories Retrieved Successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  createCategory,
  getCategories,
};
