const searchInput = document.getElementById("searchInput");
const savedCount = document.getElementById("savedCount");
const bookmarkButton = document.querySelector(".save-btn");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const exerciseCards = document.querySelectorAll(".cards");
const noResults = document.getElementById("noResults");

let currentFilter = "all";
let showSavedOnly = false;
let count = 0;

/* Show cards that match the search, category, and saved-only setting. */
function updateCards() {
	const searchText = searchInput.value.trim().toLowerCase();
	let visibleCount = 0;

	exerciseCards.forEach((card) => {
		const name = card.querySelector("h3").textContent.toLowerCase();
		const description = card.querySelector("p").textContent.toLowerCase();
		const isSaved = card.querySelector(".card-save").getAttribute("aria-pressed") === "true";
		const matchesSearch = name.includes(searchText) || description.includes(searchText);
		const matchesFilter = currentFilter === "all" || card.dataset.category === currentFilter;
		const matchesSaved = !showSavedOnly || isSaved;

		card.hidden = !(matchesSearch && matchesFilter && matchesSaved);
		if (!card.hidden) visibleCount++;
	});

	noResults.hidden = visibleCount > 0;
}

/* Update the saved count when a star is clicked. */
document.querySelectorAll(".card-save").forEach((button) => {
	button.addEventListener("click", () => {
		const isSaved = button.getAttribute("aria-pressed") === "true";
		button.setAttribute("aria-pressed", !isSaved);
		count += isSaved ? -1 : 1;
		savedCount.textContent = count;
		updateCards();
	});
});

/* Change the selected category when a filter is clicked. */
filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		currentFilter = button.dataset.filter;

		filterButtons.forEach((filterButton) => {
			filterButton.classList.remove("selected");
			filterButton.setAttribute("aria-pressed", "false");
		});

		button.classList.add("selected");
		button.setAttribute("aria-pressed", "true");
		updateCards();
	});
});

/* Toggle between all exercises and saved exercises. */
bookmarkButton.addEventListener("click", () => {
	showSavedOnly = !showSavedOnly;
	bookmarkButton.setAttribute("aria-pressed", showSavedOnly);
	updateCards();
});

searchInput.addEventListener("input", updateCards);


