let click = 0;
const loveEmoji = "\u2661";
const removeEmoji = "\u2665";

// let number = 0;
// document.querySelector(".number").textContent = number;

document
  .querySelector(".favoritedColors")
  .addEventListener("click", function () {
    const savedColorsDiv = document.querySelector(".colorsVisible");
    const overlay = document.querySelector(".overlay");
    if (savedColorsDiv.style.display === "none") {
      savedColorsDiv.style.display = "flex";
      overlay.style.display = "block";
    }
  });

document.querySelectorAll(".backHome").forEach((btn) => {
  btn.addEventListener("click", function () {
    const savedColorsDiv = document.querySelector(".colorsVisible");
    const overlay = document.querySelector(".overlay");
    if (savedColorsDiv.style.display === "flex") {
      savedColorsDiv.style.display = "none";
      overlay.style.display = "none";
    }

    // document.addEventListener("keydown", function (e) {
    //   if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    //     closeModal();
    //   }
    // });
  });
});

document.querySelector(".overlay").addEventListener("click", function () {
  const savedColorsDiv = document.querySelector(".colorsVisible");
  const overlay = document.querySelector(".overlay");
  if (savedColorsDiv.style.display === "flex") {
    overlay.style.display = "none";
    savedColorsDiv.style.display = "none";
  }
});

document.querySelector(".colorBtn").addEventListener("click", function (e) {
  document.querySelectorAll(".boxes").forEach((box) => {
    const newColor = hexColor();
    box.querySelector(".box").style.backgroundColor = newColor;
    box.querySelector(".colorID").textContent = newColor;

    box.querySelector(".colorName").textContent = rgbColor(newColor);

    box.querySelector(".love").innerHTML = loveEmoji;
    click = 1;
    console.log(box.querySelector(".love").innerHTML);
  });
});
// &#x2665; &#9825;
function hexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function rgbColor(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

const snackbar = document.getElementById("snackbar");

document.querySelectorAll(".love").forEach((emoji) => {
  emoji.innerHTML = loveEmoji;
  console.log(emoji.textContent);
  emoji.addEventListener("click", function () {
    const box = emoji.parentElement;

    const hexColor = box.querySelector(".colorID").textContent;
    console.log(hexColor);

    const rgbColor = box.querySelector(".colorName").textContent;
    console.log(rgbColor);
    if (click < 1) {
      console.log("CLICK THE COLOR BUTTON FIRST!");
    } else if (click === 1 && emoji.innerHTML === loveEmoji) {
      savedColorsToLocalStorage(hexColor, rgbColor);
      savedColors(box, hexColor, rgbColor);
      emoji.innerHTML = removeEmoji;
      updateNumber(1);
      //   number++;
      //   document.querySelector(".number").textContent = number;
      snackbar.style.display = "block";
      snackbar.textContent = "Added to favorites";
      console.log(emoji.innerHTML);
      setTimeout(function () {
        snackbar.style.display = "none";
      }, 600);
    } else {
      removeColorsFromLocalStorage(hexColor);
      removeColor(hexColor);
      console.log("color removeed");
      updateNumber(-1);
      //   number--;
      //   document.querySelector(".number").textContent = number;
      emoji.innerHTML = loveEmoji;
      snackbar.style.display = "block";
      snackbar.textContent = "Removed from favorites";
      console.log("Removed from favorite");
      setTimeout(function () {
        snackbar.style.display = "none";
      }, 600);
    }

    // const eachBox = emoji.target.closet(".box");
    // const colorName = box.querySelector(".colorID").textContent;
    // const rgbValue = box.querySelector(".colorName").textContent;
    // saveColor(colorName, rgbValue);
  });
});

// saving to local storage
function savedColorsToLocalStorage(hex, rgb) {
  let savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
  savedColors.push({ hex, rgb });
  localStorage.setItem("savedColors", JSON.stringify(savedColors));
}

// removing to local storage
function removeColorsFromLocalStorage(hex) {
  let savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
  savedColors = savedColors.filter((color) => color.hex !== hex);
  localStorage.setItem("savedColors", JSON.stringify(savedColors));
}

function loadSavedColors() {
  let savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
  savedColors.forEach((color) => {
    // function savedColors(box, hex, rgb) {
    const savedColorsDiv = document.querySelector(".savedColor");
    const colorBox = document.createElement("div");
    colorBox.classList.add("saved-Color");
    colorBox.style.backgroundColor = color.hex;
    colorBox.innerHTML = `
               <span class="remove-Color top-0 text-2xl text-white  cursor-pointer">${removeEmoji}</span>
                <div class="colorID">${color.hex}</div>
                <p class="colorName text-white text-center">${color.rgb}</p>
              
                `;
    console.log(colorBox);

    colorBox.querySelector(".remove-Color").addEventListener("click", () => {
      savedColorsDiv.removeChild(colorBox);
      removeColorsFromLocalStorage(color.hex);

      document.querySelectorAll(".love").forEach((emoji) => {
        const box = emoji.parentElement;
        if (box.querySelector(".colorID").textContent === color.hex) {
          emoji.innerHTML = loveEmoji;
        }
      });
      // emoji.innerHTML = "save";

      snackbar.style.display = "block";
      snackbar.textContent = "Removed from favorites";
      updateNumber(-1);
      //   number--;
      //   document.querySelector(".number").textContent = number;
      setTimeout(function () {
        snackbar.style.display = "none";
      }, 600);
    });
    savedColorsDiv.appendChild(colorBox);
    // box.dataset.savedColorBoxId = colorBox;
  });
  updateNumber(savedColors.length);
  console.log(updateNumber(savedColors.length));
}
function savedColors(box, hex, rgb) {
  const savedColorsDiv = document.querySelector(".savedColor");
  const colorBox = document.createElement("div");
  colorBox.classList.add("saved-Color");
  colorBox.style.backgroundColor = hex;
  colorBox.innerHTML = `
 <span class="remove-Color top-0 text-2xl text-white  cursor-pointer">${removeEmoji}</span>
  <div class="colorID">${hex}</div>
  <p class="colorName text-white text-center">${rgb}</p>

  `;
  console.log(colorBox);

  colorBox.querySelector(".remove-Color").addEventListener("click", () => {
    savedColorsDiv.removeChild(colorBox);
    removeColorsFromLocalStorage(hex);
    // emoji.innerHTML = "save";
    box.querySelector(".love").innerHTML = loveEmoji;

    snackbar.style.display = "block";
    snackbar.textContent = "Removed from favorites";
    updateNumber(-1);
    // number--;
    // document.querySelector(".number").textContent = number;
    setTimeout(function () {
      snackbar.style.display = "none";
    }, 600);
  });
  savedColorsDiv.appendChild(colorBox);
  // box.dataset.savedColorBoxId = colorBox;
}

function removeColor(hex) {
  const savedColorsDiv = document.querySelector(".savedColor");
  const colorBoxes = savedColorsDiv.querySelectorAll(".saved-Color");
  colorBoxes.forEach((colorBox) => {
    if (colorBox.querySelector(".colorID").textContent === hex) {
      savedColorsDiv.removeChild(colorBox);
      console.log("color removeed");
    }
  });
}

// document.getElementById("viewColors").addEventListener("click", () => {
//   window.location.href = "savedColors.html";
// });

function updateNumber(change) {
  const savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
  const counter = document.querySelector(".number");
  counter.textContent = savedColors.length;
}

document.addEventListener("DOMContentLoaded", loadSavedColors);
