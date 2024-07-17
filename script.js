const track = document.getElementById("image-track");
const content = document.getElementById("content");
const images = document.querySelectorAll(".image");
const seeMoreButtons = document.querySelectorAll(".see-more");
const darkModeToggle = document.getElementById("dark-mode-toggle");
let startX;
let isSwiping = false;

let mouseDownAt = 0;
let prevPercentage = 0;  // Start at -100% to align images to the right
let percentage = 0;  // Start at -100% to align images to the right
let currentPage = 1;  // Start at the last page
let isDarkMode = true;  // Start in dark mode
let transitionInProgress = false;  // Variable to track transition state

const imageData = [
    { 
        title: "firewatch",
        description: `<br>a <span class="tech"> geospatial ml pipeline </span> for wildfire<span class="tech"> prediction</span>. 
                        implemented kNN and logistical regression with 0.6 MSE loss on 
                       aggregated training data via custom parsers. 
                       raised <span class="tech"> $10k </span> pre-seed.
                      <br><br><a href="https://github.com/FireWatch-ai/fireWatch" target="_blank">view on github</a>`
    },
    { 
        title: "crux platforms",
        description: `<br>an <span class="crux">ed-tech</span> platform that streamlines practice resouces for international competitions. 
                        currently deployed to <span class="crux">450+ users</span> in 2 schools and in <span class="crux">licensing</span> agreements
                        with hosa canada.
        
        
                      <br><br><a href="https://github.com/Crux-Platforms" target="_blank">view on github</a>`
    },
    { 
        title: "nokia",
        description: `<br>utilizing<span class="nokia"> RAG </span>and<span class="nokia"> in-house LLMs </span>for faster RCA to traceback failures in machine logs. developing dashboards in <span class="nokia">splunk</span> to correlate ~40k failures/day for <span class="nokia">10k+ users</span> internationally.
                      <br><br>currently working in <span class="nokia">NI Optics</span> (ottawa)`
    },
    { 
        title: "hc face recognizer",
        description: `<br><span class="hcfr">open-source</span> program that utilizes the <span class="hcfr">haar cascades</span> model to recognize familiar faces. the user is able to provide <span class="hcfr">custom training data</span> & labels to build their own recognizer.
                      <br><br><a href="https://github.com/jindalchinmay/HC_FaceRecognition" target="_blank">view on github</a>`
    },
    { 
        title: "live",
        description: `<br>working with <span class="live">professor po-shen loh</span> from carnegie mellon university to reinvent online <span class="live">math education</span> for students. i teach alongside <a href="https://live.poshenloh.com/stars" target="_blank">very cool people</a> and professional actors.
                      <br><br><a href="https://live.poshenloh.com" target="_blank">view the website</a>`
    },
    { 
        title: "math",
        description: `<br><span class="math">problem-solving</span> is at the core of everything i do, and my exposure in tech was through <span class="math">contest math</span>. some relevant math stats:
                        <ul>
                        <li>2x <span class="math">aime qualifier</span></li>
                        <li><span class="math">honor roll</span> for euclid, hypatia, csmc</li>
                        <li>9th nationally <a href="https://cms.math.ca/competitions/clmc/clmc2023/awards/" target="_blank">clmc</a></li>
                        <li><span class="math">emacs</span> '24 @ uwaterloo </li>
                      </ul>`
    },
    { 
        title: "competitve programming",
        description: `<br>solving <span class="tech">computational problems</span> using algorithims and data structures. placed on the ccc senior '24 honour roll.
                      
                       <br><br><a href="https://www.cemc.uwaterloo.ca/contests/past_contests/2024/2024CCCResults.pdf" target="_blank">view</a>`
    },
    { 
        title: "guitar",
        description: `<br>the creative corner. currently working with <span class="crux">abstract music records</span> to help produce riffs and do some shows. check out some songs below.
                      <br><br><a href="https://open.spotify.com/album/5BKtttCpaLi2yt0MqofGLc?si=JD3MM-a1Ql6kM31Z0oXsug" target="_blank">listen to the album</a>`
    }
];

// Initialize the track position and image positions
window.onload = () => {
    updateTrackPosition();
    updatePageNumber();
}

window.onmousedown = e => {
    mouseDownAt = e.clientX;
}

window.onmousemove = e => {
    if (mouseDownAt === 0) return;

    const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const newPercentage = prevPercentage + (mouseDelta / maxDelta) * -100;
    percentage = Math.max(Math.min(newPercentage, 0), -100);

    updateTrackPosition();
    updatePageNumber();
    checkEasterEgg();
}

window.onmouseup = () => {
    mouseDownAt = 0;
    prevPercentage = percentage;
}

window.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isSwiping = true;
});

window.addEventListener('touchmove', e => {
    if (!isSwiping) return;

    const mouseDelta = startX - e.touches[0].clientX;
    const maxDelta = window.innerWidth / 2;

    const newPercentage = prevPercentage + (mouseDelta / maxDelta) * -100;
    percentage = Math.max(Math.min(newPercentage, 0), -100);

    updateTrackPosition();
    updatePageNumber();
    checkEasterEgg();
});

window.addEventListener('touchend', () => {
    isSwiping = false;
    prevPercentage = percentage;
});


function updateTrackPosition() {
    if (window.innerWidth <= 768) {
        // On mobile, don't animate horizontal movement
        return;
    }
    track.animate({
        transform: `translate(${percentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    content.animate({
        transform: `translate(${percentage * 5.75}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of images) {
        image.animate({
            objectPosition: `${100 + percentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

function updatePageNumber() {
    const pageNumber = document.querySelector("#page-number .current");
    currentPage = Math.min(Math.max(Math.floor((percentage * -1 / 100) * 8) + 1, 1), 8);
    pageNumber.textContent = currentPage;
}

function checkEasterEgg() {
    if (percentage <= -95.5) {  // Show Easter egg when reaching the 8th image (87.5% = 7/8 * 100%)
        showEasterEgg();
    } else {
        hideEasterEgg();
    }
}

function showEasterEgg() {
    let easterEgg = document.getElementById("easter-egg");
    if (!easterEgg) {
        easterEgg = document.createElement("div");
        easterEgg.id = "easter-egg";
        easterEgg.innerHTML = "if u were wondering <br>how the pics relate<br> to the content,<br><br> they dont";
        easterEgg.style.position = "fixed";
        easterEgg.style.right = "20px";
        easterEgg.style.bottom = "20px";
        easterEgg.style.background = "rgba(0, 0, 0, 0.7)";
        easterEgg.style.color = "white";
        easterEgg.style.padding = "10px";
        easterEgg.style.borderRadius = "5px";
        easterEgg.style.fontFamily = "'Roboto Mono', monospace";
        easterEgg.style.zIndex = "1000";
        easterEgg.style.opacity = "0";
        easterEgg.style.transition = "opacity 0.5s ease-in-out";
        document.body.appendChild(easterEgg);
    }
    setTimeout(() => {
        easterEgg.style.opacity = "1";
    }, 100);
}

function hideEasterEgg() {
    const easterEgg = document.getElementById("easter-egg");
    if (easterEgg) {
        easterEgg.style.opacity = "0";
    }
}

for (const button of seeMoreButtons) {
    button.addEventListener("click", e => {
        const image = e.target.previousElementSibling;
        enlargeImage(image);
    });
}

function enlargeImage(clickedImage) {
    const index = Array.from(images).indexOf(clickedImage);
    const { title, description } = imageData[index];

    const enlargedView = document.createElement("div");
    enlargedView.id = "enlarged-view";

    const enlargedImage = clickedImage.cloneNode();
    enlargedImage.style.filter = "none";

    const textContainer = document.createElement("div");
    textContainer.className = "text-container";

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = description;

    const closeButton = document.createElement("div");
    closeButton.className = "close-button";
    closeButton.textContent = "×";
    closeButton.onclick = closeEnlargedView;

    textContainer.appendChild(titleElement);
    textContainer.appendChild(descriptionElement);

    enlargedView.appendChild(enlargedImage);
    enlargedView.appendChild(textContainer);
    enlargedView.appendChild(closeButton);

    document.body.appendChild(enlargedView);

    setTimeout(() => {
        enlargedView.style.opacity = "1";
    }, 50);

    setTimeout(() => {
        enlargedImage.style.transform = "scale(1.2)";
        enlargedImage.style.filter = "blur(7px) brightness(30%)";
        textContainer.style.opacity = "1";
        
        // Animate the 'X' button
        //closeButton.style.transition = "all 0.5s ease";
        //closeButton.style.transform = "translate(5rem, -3.5rem)";
    }, 1000);

    // Add touch event listeners for mobile
    let startY;
    enlargedView.addEventListener('touchstart', e => {
        startY = e.touches[0].clientY;
    });

    enlargedView.addEventListener('touchmove', e => {
        const currentY = e.touches[0].clientY;
        if (startY - currentY > 50) {
            closeEnlargedView();
        }
    });
}

function closeEnlargedView() {
    const enlargedView = document.getElementById("enlarged-view");
    if (enlargedView) {
        enlargedView.style.opacity = "0";
        setTimeout(() => {
            enlargedView.remove();
        }, 500);
    }
}

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        closeEnlargedView();
    }
}

// Dark mode toggle functionality
darkModeToggle.addEventListener("click", () => {
    if (transitionInProgress) return;  // Prevent toggle during transition

    isDarkMode = !isDarkMode;
    transitionInProgress = true;
    updateDarkMode();

    setTimeout(() => {
        transitionInProgress = false;
    }, 4000);  // Duration of the transition
});


function updateDarkMode() {
    document.body.classList.toggle("light-mode", !isDarkMode);

    const icons = document.querySelectorAll("#social-icons img");

    function makeIconsDisappear() {
        icons.forEach(icon => {
            // Add a class to override the transition
            icon.classList.add('instant-disappear');
            icon.style.opacity = "0"; // Set opacity to 0 for instant disappearance
        });
    }
    
    // Function to make icons fade back in
    function makeIconsFadeIn() {
        icons.forEach(icon => {
            // Remove the class to revert back to CSS transition
            icon.classList.remove('instant-disappear');
            icon.style.opacity = "1"; // Set opacity to 1 for fade-in effect
        });
    }

    icons.forEach(icon => {
        const src = icon.src;
        icon.src = isDarkMode ? src.replace('.svg', '2.svg') : src.replace('2.svg', '.svg');
        makeIconsDisappear();  // Hide icons initially
    });

    setTimeout(() => {
        makeIconsFadeIn();
    }, 2000);  // Delay for icons fade-in to sync with background transition

    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.textContent = isDarkMode ? "🔆" : "🌑";
}


// Update the click event listener
document.querySelector('.toggle-switch').addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    updateDarkMode();
});