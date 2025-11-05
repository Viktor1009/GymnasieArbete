window.addEventListener("DOMContentLoaded", () => {
    triangle();
    player();
});

function triangle() {
    const triangleSpeed = -7;
    setInterval(spawnTriangle, 1500);
    console.log("1triangle!")

    function spawnTriangle() {
        const triangle = document.createElement("div");
        triangle.className = "triangle";

        const y = window.innerHeight * 0.15;
        triangle.style.bottom = `${y}px`;
        let x = window.innerWidth + 20;
        triangle.style.left = `${x}px`;

        document.body.appendChild(triangle);

        function moveTriangle() {
            x += triangleSpeed;
            triangle.style.left = `${x}px`;

            if (x > -50)
            {
                requestAnimationFrame(moveTriangle);
            } 
            else 
            {
                triangle.remove();
            }
        }

        requestAnimationFrame(moveTriangle);
        
    }
}


function player() {
    const player = document.getElementById("player");
    let y = parseFloat(getComputedStyle(player).bottom);
    const jumpHeight = 160;
    const jumpSpeed = 10;
    const gravity = 7;

    console.log("player!");

    document.addEventListener("click", (event) => {
    if (event.button === 0) {
        console.log("click!");
        playerJump();
    }
    });

    document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        console.log("space!");
        playerJump();
    }
    });

    function playerJump() {
        
        const startY = y;
        const peakY = startY + jumpHeight;
        let goingUp = true;

        function movePlayer() {
            if (goingUp) {
                y += jumpSpeed;
                if (y >= peakY) {
                    goingUp = false;
                }
            } else {
                y -= gravity;
                if (y <= startY) {
                    y = startY;
                    player.style.bottom = `${y}px`;
                    return;
                }
            }

            player.style.bottom = `${y}px`;
            requestAnimationFrame(movePlayer);
        }

        requestAnimationFrame(movePlayer);
    }
}