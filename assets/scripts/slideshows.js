const slideshowIndices = new WeakMap();
const slideshowSections = document.querySelectorAll("[data-slideshow]");

slideshowSections.forEach((slideshow) => {
    slideshowIndices.set(slideshow, 1);

    const previousButton = slideshow.querySelector("[data-action='prev']");
    const nextButton = slideshow.querySelector("[data-action='next']");
    const dots = slideshow.querySelectorAll(".dot");

    previousButton?.addEventListener("click", () => changeSlide(slideshow, -1));
    nextButton?.addEventListener("click", () => changeSlide(slideshow, 1));

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const targetSlide = Number(dot.dataset.slide);
            showSlides(targetSlide, slideshow);
        });
    });

    showSlides(1, slideshow);
});

function changeSlide(slideshow, step) {
    const currentIndex = slideshowIndices.get(slideshow) || 1;
    showSlides(currentIndex + step, slideshow);
}

function showSlides(index, slideshow) {
    const slides = slideshow.querySelectorAll(".mySlides");
    const dots = slideshow.querySelectorAll(".dot");

    if (slides.length === 0) {
        return;
    }

    let nextIndex = index;

    if (nextIndex > slides.length) {
        nextIndex = 1;
    }

    if (nextIndex < 1) {
        nextIndex = slides.length;
    }

    slides.forEach((slide) => {
        slide.style.display = "none";
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });

    slides[nextIndex - 1].style.display = "block";

    const activeDot = dots[nextIndex - 1];
    if (activeDot) {
        activeDot.classList.add("active");
    }

    slideshowIndices.set(slideshow, nextIndex);
}

const legCalculatorForm = document.getElementById("legCalculatorForm");
const heightInput = document.getElementById("heightInput");
const heightUnit = document.getElementById("heightUnit");
const legLengthResult = document.getElementById("legLengthResult");
const inseamResult = document.getElementById("inseamResult");

if (legCalculatorForm && heightInput && heightUnit && legLengthResult && inseamResult) {
    legCalculatorForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const heightValue = Number(heightInput.value);
        const unitValue = heightUnit.value;

        if (!Number.isFinite(heightValue) || heightValue <= 0) {
            legLengthResult.textContent = "Enter a valid height";
            inseamResult.textContent = "Enter a valid height";
            return;
        }

        const legLength = heightValue * 0.53;
        const inseam = heightValue * 0.46;
        const unitLabel = unitValue === "in" ? '"' : unitValue;

        legLengthResult.textContent = `${legLength.toFixed(2)} ${unitLabel}`;
        inseamResult.textContent = `${inseam.toFixed(2)} ${unitLabel}`;
    });
}
