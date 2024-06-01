exports.generateToken = (length = 24) =>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return token;
}
