
function showOptions() {
    ok.style.display = "none";
    createButton("Definitions");
    createButton("Start Game");
}

function createButton(btnText) {
    strtGame = document.createElement("button");
    strtGame.className = "optionButtons";
    strtGame.innerHTML = btnText;
    strtGame.addEventListener("click", goToOtherPage);
    details.appendChild(strtGame);
}

function preventInsertNumbers() {
    if (event.keyCode >= 48 && event.keyCode <= 57)
        event.preventDefault();
}

function enableSubmit() {
    if (document.getElementById("userName").value != "" && document.getElementById("userPassword").value != "")
        ok.disabled = false;
}

function goToOtherPage() {
    if (event.target.innerHTML == "Start Game") {
        window.location = "game.html";
    }
    else window.location = "definition.html";
}
