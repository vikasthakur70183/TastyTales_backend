const express = require('express');
const router = express.Router();

const auth=require('../Controller/users/auth');

// Search routes imports
const SearchByMealId = require('../Controller/Recipe/search/SearchById');
const SearchByMealsCategorie = require('../Controller/Recipe/search/SearchByCategorie');
const SearchByMealsArea = require('../Controller/Recipe/search/SearchByArea');
const SearchByMealsName = require('../Controller/Recipe/search/SearchByName');

//save recipe route imports
const recipe =require('../Controller/Recipe/savedRecipe/saverecipe')
const getRecipe=require('../Controller/Recipe/savedRecipe/getallSavedRecipe')


// Search routes
router.post('/api/SearchById', SearchByMealId.SearchById);
router.post('/api/SearchBycategory', SearchByMealsCategorie.SearchByCategorie);
router.post('/api/SearchByArea', SearchByMealsArea.SearchByArea);
router.post('/api/SearchByName', SearchByMealsName.SearchByName);


//saved Recipe routes
router.post('/api/Save',recipe.saveRecipe);
router.post('/api/GetSavedRecipe',getRecipe.getallsaveRecipe);


module.exports = router;