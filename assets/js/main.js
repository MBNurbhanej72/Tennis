// Toggle Sidebar

const sidebar = document.querySelector(".sidebar");

function toggleMenu() {
  sidebar.classList.toggle("activeMenu");
}



// Side Nav Active Effect

const navDiv = document.querySelectorAll("nav div");
const navItems = document.querySelectorAll(".nav-items");

function resetActiveNav() {
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].style.color = "";
  }

  for (let i = 0; i < navDiv.length; i++) {
    navDiv[i].style.borderRight = "";
  }
}

for (let i = 0; i < navDiv.length; i++) {
  navDiv[i].addEventListener("click", () => {
    resetActiveNav();
    navItems[i].style.color = "#1657FF";
    navDiv[i].style.borderRight = "5px solid #1657FF";
  });
}



// Image Picker

const imagePickerInput = document.querySelector(".imagePickerInput");
const imgPickerDP = document.querySelector(".imgPickerDP");

imagePickerInput.addEventListener("change", (e) => {
  const img = e.target.files[0];

  const reader = new FileReader();

  reader.onload = (e) => {
    imgPickerDP.src = e.target.result;
  };

  reader.readAsDataURL(img);
});