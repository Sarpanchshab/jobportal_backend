const CategoryModel = require('../models/Category'); // Adjust the path as needed
const JobModel = require("../models/Job")

// Controller to handle category operations
class CategoryController {

    // Create a new category
    static createCategory = async (req, res) => {
        try {
            const { name, icon } = req.body;

            // Validate request data
            if (!name || !icon) {
                return res.status(400).json({ message: "Name and icon are required." });
            }

            // Create and save the category
            const category = new CategoryModel({ name, icon });
            await category.save();

            res.status(201).json({ message: "Category created successfully.", category });
        } catch (error) {
            res.status(500).json({ message: "An error occurred.", error: error.message });
        }
    }

    // Get all categories
    static getAllCategories = async (req, res) => {
        try {
            const categories = await CategoryModel.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "An error occurred.", error: error.message });
        }
    }

    // Get a single category by ID
    static getCategoryById = async (req, res) => {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findById(id);
            
            if (!category) {
                return res.status(404).json({ message: "Category not found." });
            }

            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: "An error occurred.", error: error.message });
        }
    }

    static Categorylist = async (req, res) => {
        try {
            const { name } = req.params;
            //console.log(name)
            const categorylist = await JobModel.find({category:name});
           // console.log(categorylist)
            
            if (!categorylist) {
                return res.status(404).json({ message: "category  not found" });
            }
            res.status(200).json({
                success: true,
                categorylist,
              });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ status: "failed", message: error.message });
        }
    };
    
    // Update a category by ID
    static updateCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, icon } = req.body;

            const updatedCategory = await CategoryModel.findByIdAndUpdate(
                id,
                { name, icon },
                { new: true } // Return the updated document
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: "Category not found." });
            }

            res.status(200).json({ message: "Category updated successfully.", updatedCategory });
        } catch (error) {
            res.status(500).json({ message: "An error occurred.", error: error.message });
        }
    }

    // Delete a category by ID
    static deleteCategory = async (req, res) => {
        try {
            const { id } = req.params;

            const deletedCategory = await CategoryModel.findByIdAndDelete(id);

            if (!deletedCategory) {
                return res.status(404).json({ message: "Category not found." });
            }

            res.status(200).json({ message: "Category deleted successfully." });
        } catch (error) {
            res.status(500).json({ message: "An error occurred.", error: error.message });
        }
    }

};

module.exports = CategoryController;
