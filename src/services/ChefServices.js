const FETCH_URL = 'http://localhost:4200/api/';

export default class ChefServices {
    registerChef = (chef) => {
        // console.log(chef);
        return fetch(FETCH_URL + 'registerChef', {
            method: 'post',
            body: JSON.stringify(chef),
            headers: {
                'content-type': 'application/json'
            },
            credentials: "same-origin"
        }).then(res => console.log(res));
    };

    endorseRecipe = (userId, recipeId) => {
        return fetch(FETCH_URL + 'chef/' + userId + '/recipes/' + recipeId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };

    removeEndorsed = (userId, recipeId) => {
        return fetch(FETCH_URL + 'chef/' + userId + '/recipes/' + recipeId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };
}
