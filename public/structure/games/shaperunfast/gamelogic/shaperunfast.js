window.addEventListener("DOMContentLoaded", () => {
    const pointSystem = points();
    triangle(pointSystem);
    player();
});

function points() {
    let points = 0;

    function updatePointDisplay() { // updaterar UI:n för poäng
        const pointDiv = document.getElementById("points");
        if (pointDiv) {
            pointDiv.textContent = points;
        }
    }
    function addPoint() { // räknar poängen
        points++;
        updatePointDisplay();

    }
    updatePointDisplay();
    return {
        addPoint // gör att andra funktioner kan nå add addpoint funktionen 
    };
}

function triangle(pointSystem) {
    const triangleSpeed = 7;

    setInterval(spawnTriangle, 1500);
    console.log("1triangle!")

    function spawnTriangle() {
        const triangle = document.createElement("div");
        triangle.className = "triangle";

        const y = window.innerHeight * 0.15; // bestämer start position av trianglen
        triangle.style.bottom = `${y}px`; // bestämer start position av trianglen
        let x = window.innerWidth + 20; // bestämer start position av trianglen
        triangle.style.left = `${x}px`; // bestämer start position av trianglen
        document.body.appendChild(triangle);

        let counted = false;

        function moveTriangle() {
            x -= triangleSpeed; // ändrar trianglens x position i samband med konstanten triangle speed
            triangle.style.left = `${x}px`;

            const triangleDimensions = triangle.getBoundingClientRect();
            const playerElement = document.getElementById("player");
            const playerDimensions = playerElement.getBoundingClientRect();

            if (!counted && triangleDimensions.right < playerDimensions.left) // registrerar när trianglen har passerat spelaren och om den annu inte räknats
            {
                counted = true;
                pointSystem.addPoint();
            }

            if (x > -20) // tittar på om trianglen fortfarande befinner sig på skärmen
            {
                requestAnimationFrame(moveTriangle);
            }
            else // om inte, tar bort den
            {
                triangle.remove();
            }
        }
        requestAnimationFrame(moveTriangle); // börjar flytta på trianglen
    }
}

function player() {
    const player = document.getElementById("player");
    let y = parseFloat(getComputedStyle(player).bottom);
    const jumpHeight = 160;
    const jumpSpeed = 10;
    const gravity = -2;
    var isJumping = false;
    var velocity = 0;

    console.log("player!");

    document.addEventListener("click", (event) => { // registrerar om man trycker på vänster click
        if (event.button === 0) {
            console.log("click!");
            playerJump();
        }
    });

    document.addEventListener("keydown", (event) => { // registrerar om man trycker på space
        if (event.code === "Space") {
            event.preventDefault();
            console.log("space!");
            playerJump();
        }
    });

    function playerJump() {
        if (isJumping) // om spelaren hoppar, vänta på nästa input
        {
            return;
        }
        isJumping = true; // gör att bara en playerJump funktion kan köra i taget
        const startY = y; // sätter fast start positionen
        const peakY = startY + jumpHeight;
        let goingUp = true;

        function movePlayer() {

            velocity += gravity;
            
            if(goingUp) {
                velocity = 7 / (y/peakY);
                if (y > peakY) {
                    y = peakY;
                    goingUp = false;
                }
            } else {
                if(y <= startY) {
                    y = startY;
                    isJumping = false; // hoppar inte längre
                    player.style.bottom = `${y}px`;

                    return;
                }
            }
            y += velocity

            player.style.bottom = `${y}px`;
            requestAnimationFrame(movePlayer);
        }

        requestAnimationFrame(movePlayer);
    }
}
