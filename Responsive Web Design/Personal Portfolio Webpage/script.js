const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo");
const navLink = document.getElementById("navbar");

const hideNavbarFunc = () => {
	if (window.innerWidth < 900) {
		navbar.classList.toggle("show-navbar");
	}
};

logo.addEventListener("click", hideNavbarFunc);

navLink.addEventListener("click", hideNavbarFunc);
