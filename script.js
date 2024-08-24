function generatePassword() {
    const length = document.getElementById('length').value;
    if (length > 60) {
        document.getElementById('password-output').textContent = "Error! The limit is 60 characters ";
        updateStrengthMeter(0);
        document.getElementById('copy-button').style.display = 'none';
        return;
    }
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_-+=<>?";

    if (charset === "") {
        document.getElementById('password-output').textContent = "אנא בחרו לפחות סוג אחד של תווים.";
        updateStrengthMeter(0);
        document.getElementById('copy-button').style.display = 'none';
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById('password-output').textContent = password;
    updateStrengthMeter(calculateStrength(password));

    document.getElementById('copy-button').style.display = 'block';
}

function copyPassword() {
    const password = document.getElementById('password-output').textContent;
    navigator.clipboard.writeText(password).then(() => {
        const checkmark = document.getElementById('checkmark');
        checkmark.style.display = 'inline';
        setTimeout(() => {
            checkmark.style.display = 'none';
        }, 2000);
    }).catch(err => {
        alert('התרחשה שגיאה בהעתקת הסיסמה.');
    });
}

function calculateStrength(password) {
    let strength = 0;

    const lengthBonus = password.length >= 12 ? 2 : password.length >= 8 ? 1 : 0;
    const varietyBonus = (/[A-Z]/.test(password) ? 1 : 0) + 
                         (/[a-z]/.test(password) ? 1 : 0) + 
                         (/\d/.test(password) ? 1 : 0) + 
                         (/[^A-Za-z0-9]/.test(password) ? 1 : 0);

    strength = lengthBonus + varietyBonus;

    return (strength / 6) * 100;
}

function updateStrengthMeter(strength) {
    const strengthMeterFill = document.getElementById('strength-meter-fill');
    strengthMeterFill.style.width = strength + "%";
    if (strength < 25) {
        strengthMeterFill.style.backgroundColor = "red";
    } else if (strength < 50) {
        strengthMeterFill.style.backgroundColor = "orange";
    } else if (strength < 75) {
        strengthMeterFill.style.backgroundColor = "yellow";
    } else {
        strengthMeterFill.style.backgroundColor = "green";
    }
}
