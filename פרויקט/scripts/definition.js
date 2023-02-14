imagesForChoose = ["../images/1 (2).jpg", "../images/2.jpg", "../images/3.jpg",
    "../images/4.jpg", "../images/5.jpg", "../images/6.jpg",
    "../images/7.jpg", "../images/8.jpg", "../images/9.jpg",
    "../images/10 (2).jpg", "../images/11.jpg", "../images/13.jpg"];
chosenPic = new Array(4);
numOfChosenPic = 0;
function choosePic() {
    var picDiv = document.getElementById("divPic");
    picDiv.innerHTML = "";
    picDiv.style =" height: 300px; width: 500px;";

    imagesForChoose.forEach(element => {
        var img = document.createElement("img");
        img.className = "imgClass";
        img.src = element;
        picDiv.appendChild(img);
        img.addEventListener("click", clickOnImage);
    });
}

function clickOnImage(params) {
    chosenPic[numOfChosenPic] = event.target.src;
    numOfChosenPic++;
    event.target.style.border="solid 2px black";
    sessionStorage.setItem("chosenPic", JSON.stringify(chosenPic));
    if (numOfChosenPic == 4) {
        divPic.style.display = "none";
    }
    event.target.removeEventListener("click", clickOnImage);
}

function ChooseLvl() {
    if (event.target.id == "beginner") {
        sessionStorage.setItem("quick", 1000);
        document.getElementById("advanced").style.backgroundColor = "white";
        document.getElementById("master").style.backgroundColor = "white";
    }
    else if (event.target.id == "advanced") {
        sessionStorage.setItem("quick", 700);
        document.getElementById("beginner").style.backgroundColor = "white";
        document.getElementById("master").style.backgroundColor = "white";
    }
    else {
        sessionStorage.setItem("quick", 400);
        document.getElementById("beginner").style.backgroundColor = "white";
        document.getElementById("advanced").style.backgroundColor = "white";
    }
    event.target.style.backgroundColor = "pink";
}