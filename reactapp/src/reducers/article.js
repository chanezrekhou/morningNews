export default function (articleWishlist = [], action) {

    if (action.type === 'addArticle') {
        return action.wishlist
        
    } else if (action.type === 'deleteArticle') {
        return action.wishlist
    }
    else {
        return articleWishlist;
    }
}