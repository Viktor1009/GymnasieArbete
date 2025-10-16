const triangleSpeed = -7;
setInterval(spawnTriangle, 1500);

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

