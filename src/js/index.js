import { data } from "./data.js";
const timeframes = data.map((obj) => obj.timeframes);

const timeEls = document.querySelectorAll(".card__time");
const prevTimeEls = document.querySelectorAll(".card__prev-time");
const btns = document.querySelectorAll(".profile__btn");
const btnsContainer = document.querySelector(".profile__buttons");
const activeBtnClass = "profile__btn--active";

const removeActiveBtn = () =>
    btns.forEach((btn) => btn.classList.remove(activeBtnClass));

const renderData = function (btn, period, ind) {
    removeActiveBtn();
    btn.classList.add(activeBtnClass);
    let currData;

    if (period === "Daily") currData = timeframes.map((d) => d.daily);
    if (period === "Weekly") currData = timeframes.map((d) => d.weekly);
    if (period === "Monthly") currData = timeframes.map((d) => d.monthly);

    timeEls.forEach((el, i) => (el.textContent = `${currData[i].current}hrs`));
    prevTimeEls.forEach(
        (el, i) => (el.textContent = `Last ${ind} - ${currData[i].previous}hrs`)
    );
};

btnsContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("profile__btn")) {
        return;
    }
    if (e.target.textContent === "Daily") {
        renderData(e.target, "Daily", "Day");
    }
    if (e.target.textContent === "Weekly") {
        renderData(e.target, "Weekly", "Week");
    }
    if (e.target.textContent === "Monthly") {
        renderData(e.target, "Monthly", "Month");
    }
});
