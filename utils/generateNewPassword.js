exports.generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    // Ensure at least one number and one letter
    const getRandomLetter = () => charset.charAt(Math.floor(Math.random() * 52));
    const getRandomNumber = () => charset.charAt(Math.floor(Math.random() * 10) + 52);

    password += getRandomLetter();
    password += getRandomNumber();

    for (let i = 2; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}
