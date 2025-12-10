window.addEventListener("DOMContentLoaded", () => {
    const pointSystem = points();
    const collisionSystem = collision();
    triangle(pointSystem, collisionSystem);
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
    function deathpointDisplay(deathDiv) {
        const deathContainer = document.createElement("div");
        deathContainer.id = "deathMessageContainer";

        const title = document.createElement("h1");
        title.textContent = "Oh no, you died!";

        const finalScore = document.createElement("p");
        finalScore.textContent = `Your final score was: ${points} points`;

        deathContainer.appendChild(title);
        deathContainer.appendChild(finalScore);

        deathDiv.appendChild(deathContainer);
    }

    updatePointDisplay();
    return {
        addPoint, // gör att andra funktioner kan nå add addpoint funktionen 
        deathpointDisplay
    };
}

function collision() {

  function deathDisplay() {
      const deathDiv = document.createElement("div");
      deathDiv.className = "deathDiv";
      document.body.appendChild(deathDiv);
      return deathDiv;
  }

  return {
      deathDisplay
  };
}

function triangle(pointSystem, collisionSystem) {
    const triangleSpeed = 7;
    let stillAlive = true;

    setInterval(spawnTriangle, 1500);
    console.log("1triangle!")

    function spawnTriangle() {
        const triangle = document.createElement("div");
        triangle.className = "triangle";
        let deadly = true;

        const y = window.innerHeight * 0.15; // bestämer start position av trianglen
        triangle.style.bottom = `${y}px`; // bestämer start position av trianglen
        let x = window.innerWidth + 20; // bestämer start position av trianglen
        triangle.style.left = `${x}px`; // bestämer start position av trianglen
        document.body.appendChild(triangle);

        let counted = false;

        function moveTriangle() {
            x -= triangleSpeed; // ändrar trianglens x position i samband med konstanten triangle speed
            triangle.style.left = `${x}px`;

            const triangleDimension = triangle.getBoundingClientRect();
            const playerElement = document.getElementById("SRFplayer");
            const playerDimension = playerElement.getBoundingClientRect();

            if (!counted && triangleDimension.right < playerDimension.left) // registrerar när trianglen har passerat spelaren och om den annu inte räknats
            {
                counted = true;
                pointSystem.addPoint();
            }

            if(deadly && playerDimension.bottom > triangleDimension.top && playerDimension.right > triangleDimension.left) {
                const deathDiv = collisionSystem.deathDisplay();
            pointSystem.deathpointDisplay(deathDiv);
                stillAlive = false;
            }
            if (triangleDimension.left < playerDimension.left + 56) {
                deadly = false;
            }
            

            if (x > -20) // tittar på om trianglen fortfarande befinner sig på skärmen
            {
                if(stillAlive) {
                    requestAnimationFrame(moveTriangle);
                }
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
    const player = document.getElementById("SRFplayer");
    let y = parseFloat(getComputedStyle(player).bottom);
    const jumpHeight = 140;
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
