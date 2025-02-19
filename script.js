document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".track");
    const games = document.querySelectorAll(".game");
    let selectedIndex = 0;
    const visibleBoxes = 7;
    
    function updateSelection() {
        games.forEach((game, index) => {
            game.classList.toggle("selected", index === selectedIndex);
            const title = game.querySelector(".game-title");
            title.style.visibility = index === selectedIndex ? "visible" : "hidden";
        });

        const firstVisibleIndex = Math.max(0, selectedIndex - (visibleBoxes - 1));
        track.style.transform = `translateX(${-firstVisibleIndex * 160}px)`; // Adjusted for each game's width
    }
    
    function navigate(direction) {
        if (direction === "right" && selectedIndex < games.length - 1) {
            selectedIndex++;
        } else if (direction === "left" && selectedIndex > 0) {
            selectedIndex--;
        }
        updateSelection();
    }

    function selectGame() {
        const url = games[selectedIndex].getAttribute("data-url");
        if (url) window.location.href = url;
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            navigate("right");
        } else if (event.key === "ArrowLeft") {
            navigate("left");
        } else if (event.key === "Enter") {
            selectGame();
        }
    });

    games.forEach((game) => {
        game.addEventListener("click", () => {
            selectedIndex = [...games].indexOf(game);
            updateSelection();
            selectGame();
        });
    });

    updateSelection();
	
});
async function loadGames() {
		try {
			const response = await fetch('games.json'); // Change this to your JSON file location
			const games = await response.json();

			const track = document.querySelector('.track');
			track.innerHTML = ''; // Clear previous content

			games.forEach(game => {
				const gameDiv = document.createElement('div');
				gameDiv.classList.add('game');
				gameDiv.setAttribute('data-url', game.url);

				const img = document.createElement('img');
				img.src = game.image;
				img.alt = game.title;

				const titleDiv = document.createElement('div');
				titleDiv.classList.add('game-title');
				titleDiv.textContent = game.title;

				const devConsoleDiv = document.createElement('div');
				devConsoleDiv.classList.add('game-info');
				devConsoleDiv.textContent = `${game.developer} - ${game.console}`;

				gameDiv.appendChild(img);
				gameDiv.appendChild(titleDiv);
				gameDiv.appendChild(devConsoleDiv);
				track.appendChild(gameDiv);
			});

		} catch (error) {
			console.error("Failed to load games:", error);
		}
	}
document.addEventListener("DOMContentLoaded", loadGames);