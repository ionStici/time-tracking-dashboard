const timeEls = document.querySelectorAll(".card__time");
const prevTimeEls = document.querySelectorAll(".card__prev-time");
const btns = document.querySelectorAll(".profile__btn");
const btnsContainer = document.querySelector(".profile__buttons");
const activeBtnClass = "profile__btn--active";
let timeframes, data;

const getData = async function () {
    const res = await fetch("./../../data.json");
    const data = await res.json();
    timeframes = data.map((obj, i) => obj.timeframes);
};
getData();

const removeActiveBtn = () => btns.forEach((btn) => btn.classList.remove(activeBtnClass));

const renderData = function (btn, period) {
    removeActiveBtn();
    btn.classList.add(activeBtnClass);
    
    if (period === "Daily") data = timeframes.map((d) => d.daily);
    if (period === "Weekly") data = timeframes.map((d) => d.weekly);
    if (period === "Monthly") data = timeframes.map((d) => d.monthly);

    timeEls.forEach((el, i) => (el.textContent = `${data[i].current}hrs`));
    prevTimeEls.forEach((el, i) => (el.textContent = `Last Day - ${data[i].previous}hrs`));
};

btnsContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("profile__btn")) return;
    if (e.target.textContent === "Daily") renderData(e.target, "Daily");
    if (e.target.textContent === "Weekly") renderData(e.target, "Weekly");
    if (e.target.textContent === "Monthly") renderData(e.target, "Monthly");
});

