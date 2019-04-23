import React, {Component} from 'react'
import '../../assets/css/linearicons.css'
import '../../assets/css/magnific-popup.css'
import '../../assets/css/nice-select.css'
import '../../assets/css/animate.min.css'
import '../../assets/css/main.css'
import './Ingredients.css'
import AddIngredient from './AddIngredient'
import IngredientService from '../../services/IngredientServices'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes, faPencilAlt, faCheck} from "@fortawesome/free-solid-svg-icons";
import {library} from "../../../node_modules/@fortawesome/fontawesome-svg-core";
import {BrowserRouter as Router, Link, Route, Redirect} from "react-router-dom";
import HomePageNav from '../HomePageNav'
import {getFromStorage} from "../../utils/storage";
import UserServices from "../../services/UserServices";

library.add(faPlus, faTimes, faPencilAlt, faCheck);

class Ingredients extends Component {
    constructor(props) {
        super(props);
        this.ingredientService = new IngredientService();
        const userId = parseInt(props.match.params['userId']);
        this.state = {
            ingredients: this.props.ingredients,
            userId: userId,
            user: {},
            updateIngredientName: '',
            updatedFieldVisibility: 'd-none'
        }
        this.userServices = new UserServices();
    }

    componentDidMount() {
        document.title = "What's Cooking?";
        const obj = getFromStorage('project_april');
        if (obj && obj.token) {
            const { token } = obj;
            this.userServices.verifyUser(token).then(json => {
                console.log(json);
                if (json.success) {
                    console.log(obj.user[0]._id);
                    this.ingredientService.findIngredientsByUser(obj.user[0]._id)
                        .then(ingredients => {
                            // alert("updated"+courses.length)
                            this.setState({
                                ingredients: ingredients,
                                token,
                                user: obj.user[0]
                            })
                        });
                }
            });
        }
    }

    // addIngredient = ingredient => {
    //     alert('in call')
    //     let userID = this.state.userId;
    //     this.ingredientService.addIngredient(ingredient)
    //         .then(() => this.ingredientService.findIngredientsByUser(this.state.userId))
    //         .then(ingredients => this.setState({
    //             ingredients: ingredients
    //         }))
    //         .then(() => <Redirect push to={`/ingredients/${userID}`}/>)
    // }

    // toggleModal = () => {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    //     alert(this.state.isOpen)
    // }

    nameChanged = (event) => {
        this.setState(
            {
                updateIngredientName: event.target.value
            });
    };

    updateIngredient = () => {
        let ingredient = {
            name: this.state.updateIngredientName
        };
        this.ingredientService.updateIngredient(this.state.updateIngredientId, ingredient)
            .then(() => this.ingredientService.findIngredientsByUser(this.state.userId))
            .then(ingredients =>
                this.setState({
                    ingredients: ingredients,
                    updateIngredientName: '',
                    updateIngredientId: '',
                    updatedFieldVisibility: 'd-none'
                }))
            .then(() => {
                alert('Ingredient Updated Successfully!');
                window.location.href = `/ingredients`;
            })
    }

    selectForUpdate = (ingredient) => {
        this.setState({
            updateIngredientName: ingredient.name,
            updateIngredientId: ingredient._id,
            updatedFieldVisibility: 'd-block'
        })
    };

    deleteIngredient = (ingredientId) => {
        this.ingredientService.deleteIngredient(ingredientId)
            .then(() => this.ingredientService.findIngredientsByUser(this.state.userId))
            .then(ingredients =>
                this.setState({
                    ingredients: ingredients
                }))
            .then(() => {
                alert('Ingredient Deleted Successfully!');
                window.location.href = `/ingredients`;
            });
    }

    render() {
        let updatedName;
        return (
            <div>
                <div id="header">
                    {/*<HomePageNav/>*/}
                </div>
                <section className="about-banner relative">
                    <div className="overlay overlay-bg"></div>
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center">
                            <div className="about-content col-lg-12">
                                <h1 className="text-white">
                                    Groceries
                                </h1>
                                <p className="text-white link-nav">
                                    {/*<Link to="/home">Home </Link> */}
                                    <a href="/home">Home </a>
                                    <span className="lnr lnr-arrow-right">

                                    </span>
                                    <a href="#">Ingredients</a></p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="home-about-area section-gap">
                    <div className="container">
                        <h1 className="mb-5 text-center">In Stock Groceries</h1>
                        <div className="row">
                            <div className="col-lg-6 home-about-left">
                                <div className="table-responsive">
                                    <table className="groceries table table-bordered table-hover"
                                           id="grocery_table">
                                        <thead>
                                        <tr>
                                            <th>Ingredients</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.ingredients.map(ingredient =>
                                            <tr>
                                                <td className="name-theader">{ingredient.name}</td>
                                                <td className="actions-theader"><span><a
                                                    onClick={() => this.selectForUpdate(ingredient)}><FontAwesomeIcon
                                                    icon="pencil-alt"
                                                    className="fas"/></a>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<a
                                                        onClick={() => this.deleteIngredient(ingredient._id)}>
                                                        <FontAwesomeIcon icon="times"
                                                                         className="fas"/></a></span>
                                                </td>
                                            </tr>
                                        )}
                                        <tr className="full-width red-border">
                                            <td className="text-red">
                                                <div className={`${this.state.updatedFieldVisibility}`}>
                                                    <input className='full-width no-input-border'
                                                           value={this.state.updateIngredientName}
                                                           onChange={this.nameChanged}
                                                        // ref={node => updatedName = node}
                                                    ></input>
                                                </div>
                                            </td>
                                            <td className="actions-theader ">
                                                <div className={`${this.state.updatedFieldVisibility}`}><span>
                                                <a className="text-red" onClick={this.updateIngredient}>
                                                <FontAwesomeIcon
                                                    icon="check"
                                                    className="fas"/></a></span>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    {/*<div className={`${this.state.updatedFieldVisibility}`}>*/}
                                    {/*<input*/}
                                    {/*value={this.state.updateIngredientName}*/}
                                    {/*ref={node => updatedName = node}></input>*/}
                                    {/*</div>*/}
                                    <div className='row'>
                                        <Link to='/addIngredient'
                                              className='middle-div primary-btn text-uppercase mt-20'>
                                            Add Ingredient</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 home-about-right">
                                <img src={require('./about-img.jpg')} alt=""/>
                            </div>

                        </div>
                    </div>
                </section>
                <footer className="footer-area">
                    <div className="footer-bottom-wrap">
                        <div className="container">
                            <div className="row footer-bottom d-flex justify-content-between align-items-center">
                                <p className="col-lg-8 col-mdcol-sm-6 -6 footer-text m-0">
                                    Copyright &copy;
                                    <script>document.write(new Date().getFullYear());</script>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }


}

export default Ingredients;
