const hamberger_menu = document.getElementById("hamberger-menu");
const navbar = document.getElementById("navbar");

hamberger_menu.addEventListener("click", e => {
	navbar.classList.toggle("show-menu");
});
