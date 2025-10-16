const triangleSpeed = -7;
setInterval(spawnTriangle, 1500);

function spawnTriangle() {
    console.log("1triangle!")
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

document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    //your code
    console.log("1jump!")
  }
}
