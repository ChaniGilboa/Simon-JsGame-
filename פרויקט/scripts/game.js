var question = "../images/question.png";
var imagesArr = [
    { image: null, imgSrc: question, numImg: "0" },
    { image: null, imgSrc: question, numImg: "0" },
];

var permanentImages = ["../images/4.jpg", "../images/9.jpg", "../images/8.jpg", "../images/7.jpg"];
var numOfImages = 2;
var numAttemp = 0;
var indexOfCheckedImage = 0;
var score = 0;

function load() {
    disOrEnableClickImage(null);
    resetImage();
    time();
    showImages();

}

//הפונקציה מציגה את ארבע התמונות בהתאם לבחירת המשתמש בהגדרות
function resetImage() {
    imagesChosen = JSON.parse(sessionStorage.getItem("chosenPic"));
    if (imagesChosen != null) {
        permanentImages = imagesChosen;
    }
    images = document.getElementsByClassName("permanentPicture");
    for (let index = 0; index < images.length; index++) {
        images[index].src = permanentImages[index];
    }
}

//הפונקציה מאפשרת או לא את הלחיצה על המקשים והתמונות
function disOrEnableClickImage(condiion) {
    //לחיצה על התמונות
    permanentPictures = document.getElementsByClassName("permanentPicture");
    for (var index = 0; index < permanentPictures.length; index++) {
        permanentPictures[index].onclick = condiion;
    }
    //האזנה למקשי ההחיצים
    if (condiion == null) {
        window.('keyup', f);
    }
    else {
        window.addEventListener('keyup', f);

    }
}
function f() {
    if (event.code == "ArrowLeft") {
        if (imagesArr[indexOfCheckedImage].numImg == "2") {
            if (indexOfCheckedImage == numOfImages - 1)
                finish();
            else same();
        }
        else diffrent();
    }
    else if (event.code == "ArrowUp") {
        if (imagesArr[indexOfCheckedImage].numImg == "1") {
            if (indexOfCheckedImage == numOfImages - 1)
                finish();
            else same();
        }
        else diffrent();
    }
    else if (event.code == "ArrowRight") {
        if (imagesArr[indexOfCheckedImage].numImg == "3") {
            if (indexOfCheckedImage == numOfImages - 1)
                finish();
            else same();
        }
        else diffrent();
    }
    else if (event.code == "ArrowDown") {
        if (imagesArr[indexOfCheckedImage].numImg == "4") {
            if (indexOfCheckedImage == numOfImages - 1)
                finish();
            else same();
        }
        else diffrent();
    }
}

function time() {
    sec = 60;
    timer = window.setInterval(() => {
        timee.innerHTML = "Timing:";
        newRow = document.createElement("br");
        timee.appendChild(newRow);
        timee.innerHTML += sec;
        sec -= 1;
        if (sec == 0) {
            window.clearInterval(timer);
            sessionStorage.setItem("score", score);
            window.location = "end.html";
        }
    }, 1000);
}

function showImages() {
    //הצגת מספר סימני השאלה המתאימים
    window.setTimeout(() => {
        //ריקון התמונות שהוצגו
        divImg.innerHTML = "";
        indexOfCheckedImage = 0;
        if (numAttemp > 3 && numAttemp < 7)
            numOfImages = 3;
        else if (numAttemp > 6 && numAttemp < 10)
            numOfImages = 4;
        else if (numAttemp > 9)
            numOfImages = 5;
        //הגדלת מערך התמונות - אם יש צורך
        if (numOfImages > imagesArr.length) {
            var o = { image: null, imgSrc: question, numImg: "0" };
            imagesArr.push(o);
        }
        //הצגת סימני שאלה אחד אחרי השני    
        imagesArr.forEach((pic) => {
            pic.image = document.createElement("img");
            pic.image.src = question;
            pic.image.className = "temporaryPictures";
            document.getElementById("divImg").appendChild(pic.image);
        });
        randomImage();
    }, 10);
}

function randomImage() {
    var quick = sessionStorage.getItem("quick");
    if (quick == null) {
        quick = 1000;
    }

    //הצגת תמונה במקום סימן שאלה 
    num = 0;
    showPic = window.setInterval(() => {
        if (num < numOfImages) {
            i = Math.round(Math.random() * 3);
            imagesArr[num].imgSrc = permanentImages[i];
            imagesArr[num].image.src = imagesArr[num].imgSrc;
            imagesArr[num].numImg = (i + 1).toString();
            num++;
        }
        //אם סיימת להציג את התמונות אז---
        else {
            window.clearInterval(showPic);
            imagesArr.forEach((pic) => {
                pic.image.src = question;
            })
            disOrEnableClickImage(checkPlayerChoice);
        }
    }, 0.75 * quick);
}

function checkPlayerChoice() {
    if (event.target.dataset.numimg != imagesArr[indexOfCheckedImage].numImg) {
        diffrent();
    }
    else if (indexOfCheckedImage == numOfImages - 1) {
        finish();
    }
    else {
        same();
    }
}

function diffrent() {
    document.getElementById("audx").play();
    disOrEnableClickImage(null);
    xxxx();
}

function same() {
    imagesArr[indexOfCheckedImage].image.src = imagesArr[indexOfCheckedImage].imgSrc;
    indexOfCheckedImage++;
}

function finish() {
    imagesArr[indexOfCheckedImage].image.src = imagesArr[indexOfCheckedImage].imgSrc;
    document.getElementById("audv").play();
    disOrEnableClickImage(null);
    vvvv();
}

function xxxx() {
    xImg = document.createElement("img");
    xImg.src = "../images/75519.png";
    xImg.className = "XV";
    wrap.appendChild(xImg);
    removeXV(xImg);
}

function vvvv() {
    score += numOfImages * 6;
    vImg = document.createElement("img");
    vImg.src = "../images/2.png";
    vImg.className = "XV";
    wrap.appendChild(vImg);
    removeXV(vImg);
}

function removeXV(element) {
    window.setTimeout(() => {
        wrap.removeChild(element);
        document.getElementById("audx").pause();
        document.getElementById("audv").pause();
        nextAttemp();
    }, 700);
}

function nextAttemp() {
    currentScore.innerHTML = score;
    numAttemp++;
    showImages();
}

