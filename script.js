/* Clicking a star saves or unsaves an exercise and updates the count. */
const savedCount = document.getElementById("savedCount");
let count = 0;


document.querySelectorAll(".card-save").forEach((button) => {
	button.addEventListener("click", () => {
		const isSaved = button.getAttribute("aria-pressed") === "true";
		button.setAttribute("aria-pressed", !isSaved);
		count += isSaved ? -1 : 1;
		savedCount.textContent = count;
	});
});


/* Clicking a filter shows matching cards and highlights that filter. */
const filterButtons = document.querySelectorAll(".filter-buttons button");
const exerciseCards = document.querySelectorAll(".cards");

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const filter = button.dataset.filter;

		filterButtons.forEach((filterButton) => {
			filterButton.classList.remove("selected");
			filterButton.setAttribute("aria-pressed", "false");
		});

		button.classList.add("selected");
		button.setAttribute("aria-pressed", "true");

		exerciseCards.forEach((card) => {
			card.hidden = filter !== "all" && card.dataset.category !== filter;
		});
	});
});


