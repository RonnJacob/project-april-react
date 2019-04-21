import React from 'react';
import {browserHistory} from 'react-router'
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom'
import RegisterPage from "../containers/RegisterPage/RegisterPage";
import Ingredients from "../components/ingredients/Ingredients";
import AddIngredient from "../components/ingredients/AddIngredient";
import IngredientServices from "../services/IngredientServices";
import AddRecipe from "./recipes/AddRecipe";
import RecipeServices from "../services/RecipeServices";

class MainApp extends React.Component {
    constructor() {
        super();
        this.ingredientService = new IngredientServices();
        this.recipeService = new RecipeServices();
        this.state = {
            userId: 1,
            ingredients: [],
        }
    }

    componentDidMount() {
        this.ingredientService.findIngredientsByUser(this.state.userId)
            .then(ingredients => {
                // alert("updated"+courses.length)
                this.setState({
                    ingredients: ingredients
                })
            })
    }


    addIngredient = (ingredient) => {
        this.ingredientService.addIngredient(ingredient)
            .then(() => this.ingredientService.findIngredientsByUser(this.state.userId))
            .then(ingredients =>
                this.setState({
                    ingredients: ingredients
                }))
            .then(() => {
                alert('Ingredient Added Successfully!')
                window.location.href = `/ingredients/${this.state.userId}`
            })
    }

    addRecipe = (recipe) => {
        this.recipeService.addRecipe(recipe)
            .then(() => {
                alert('Recipe Added Successfully!')
            })
    }


    // selectCourse = (course) => {
    //     alert('hey')
    //     this.courseService.findCourseById(course)
    //         .then(course => {
    //             return this.setState({
    //                 course: course
    //             })
    //         })
    //     // .then(() => window.location.href = '/course')
    // }

    // logout = () => {
    //     this.userService.logout()
    //         .then(() => window.location.href = '/')
    // }
    //
    // profile = () => {
    //     this.userService.profile().then((user) => {
    //         return this.setState({
    //             user: user
    //         })
    //     })
    // }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route path='/ingredients/:userId' exact
                               component={(props) =>
                                   <Ingredients
                                       ingredients={this.state.ingredients}
                                       {...props}/>}/>
                        <Route path='/' exact
                               render={() =>
                                   <RegisterPage/>}/>
                        <Route path="/addIngredient"
                               render={() =>
                                   <AddIngredient
                                       addIngredient={this.addIngredient}
                                       userId={this.state.userId}/>}/>
                        <Route path="/addRecipe"
                               render={() =>
                                   <AddRecipe
                                       addRecipe={this.addRecipe}
                                       userId={1}/>}/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default MainApp;