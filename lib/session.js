 const startSession = (user,jwt) => {
    sessionStorage.setItem("user",JSON.stringify(user));
    sessionStorage.setItem("jwt",jwt);
}

export default startSession;