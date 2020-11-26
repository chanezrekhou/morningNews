export default function (sessionUser = "", action) {

    if (action.type === 'newSession') {
        return action.token
    }
    else {
        return sessionUser;
    }
}

