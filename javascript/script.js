function validateUsername() {
    const username = document.querySelector(".username");

    // usage of .trim() prevents users from just typing spaces
    if (!username || username.value.trim() === "") {
        alert("Input Name first.");
        return false; // FAILED: Tell the other functions to stop
    }
    
    return true; // PASSED: Tell the other functions to continue
}

function question() {
    // 1. The Gatekeeper: If validation fails, STOP.
    if (!validateUsername()) return;

    // 2. The rest of your code runs only if name is present
    const paragraph = document.querySelector(".container-2 p");
    const header = document.querySelector(".container-1 h1");
    
    paragraph.innerHTML = "Name of a person that you love starting with the letter ‘M’ and ends with a letter ‘N’";
    paragraph.style.color = "black";
    header.innerHTML = "QUESTION!";
}

function isPasswordCorrect() {
    // 1. The Gatekeeper: If validation fails, STOP.
    if (!validateUsername()) return;

    // 2. The rest of your code
    const password = document.querySelector(".password");
    const thisPassword = password.value;

    if (thisPassword.toLowerCase() === "myrson") {
        window.location.href = "question.html";
    } else {
        const paragraph = document.querySelector(".container-2 p");
        const header = document.querySelector(".container-1 h1");
        
        password.value = ""; // Clear the input
        
        if (paragraph) {
            header.innerHTML = "( ｡ •̀ ᴖ •́ ｡)";
            paragraph.innerHTML = "You don't know me:)";
            paragraph.style.color = "red";
        }
    }
}