function getToken(){
    const token = `Bearer ${localStorage.getItem('token')}`;
    return token;
}

export default getToken;