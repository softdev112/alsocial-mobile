import validatorBase from "validator";

function Validator() {}

for (const key in validatorBase) {
    if (validatorBase.hasOwnProperty(key)) Validator.prototype[key] = validatorBase[key];
}

Validator.prototype.extend = function(name, fn) {
    this[name] = fn;
};

export const checkName = name => {
    let nameError = "";
    if (!name) {
        nameError = "Please enter your name.";
    } else if (!/^[a-zA-Z0-9\s!@#$%&-,.]*$/.test(name)) {
        nameError = "Name must contain only letters, numbers, spaces and !@#$%&-,. characters.";
    } else if (name.length < 3 || name.length > 31) {
        nameError = "Name must be between 3 and 30 characters long.";
    }
    return nameError;
};

export const checkUsername = username => {
    let usernameError = "";
    if (!username) {
        usernameError = "Please enter your username.";
    } else if (!/^[\w.]+$/.test(username)) {
        usernameError = "Username must contain only letters, numbers, underscores and periods.";
    } else if (username.length < 3 || username.length > 31) {
        usernameError = "Username must be between 3 and 30 characters long.";
    }
    return usernameError;
};

export const checkEmail = email => {
    const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailError = "";

    if (!email) {
        emailError = "Please enter your email.";
    } else if (!emailValidation.test(email)) {
        emailError = "Please enter a valid email address.";
    }
    return emailError;
};

export const checkPassword = (password, confirmPassword) => {
    let passwordError = "";

    if (confirmPassword !== password) {
        passwordError = "Passwords do not match";
    }

    if (!password || !confirmPassword) {
        passwordError = "Please enter your passwords.";
    } else if (password.length < 8 || password.length > 60) {
        passwordError = "Password must be at least 8 characters.";
    }
    return passwordError;
};

const validator = new Validator();

const formValidator = validations => {
    return state => {
        const errors = [];

        validations.forEach(e => {
            const validationMethod = validator[e.method];
            const fieldValue = state[e.field];
            const args = e.args || [];

            if (fieldValue && !validationMethod(fieldValue, ...args, state)) {
                errors.push({ field: e.field, message: e.message });
            }
        });

        return errors;
    };
};

validator.extend("validName", str => /^[a-zA-Z0-9 !@#$%?'&-,.]*$/.test(str));

validator.extend("validUsername", str => /^[\w]+$/.test(str));

export default formValidator;
