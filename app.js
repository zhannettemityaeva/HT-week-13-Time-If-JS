const btn = document.querySelector(".btn");
const field = document.querySelector(".field");
const result = document.querySelector(".InfoMessage");
const error = document.querySelector(".ErrorMessage");

btn.addEventListener("click", countDays);
function countDays() {
  const currentDate = new Date();
  console.log(currentDate);
  let BirthDate = new Date(field.value);
  BirthDate.setHours(0); //обнуляем +3часа, которые приходят из поля в дате рождения
  console.log(BirthDate); //BirthDate из поля приходит не 00:00 GMT+03:00, а 03:00 GMT+03:00, разница с currentDate в 3 часа..//
  /* если user выбирает свой др не в текущем году, а в другом, например, в году своего рождения, то 
  let currentYear = currentDate.getFullYear();
  let BirthMonth = BirthDate.getMonth();
  let BirthDay = BirthDate.getDate();
  let BirthDateThisYear = new Date(currentYear, BirthMonth, BirthDay);
  console.log(BirthDateThisYear);
  //или так короче//
  BirthDate.setFullYear(currentDate.getFullYear());
  console.log(BirthDate);*/
  if (!field.value) {
    error.style.display = "block";
    result.textContent = ""; //если был результат предыдущего выбора даты, то убрать его//
    return; //return без значения - выход из функции//
  }

  error.style.display = "none";
  if (currentDate > BirthDate) {
    const BirthDateInFutureYear = new Date(BirthDate);
    BirthDateInFutureYear.setFullYear(currentDate.getFullYear() + 1);
    const diffInMillSc = BirthDateInFutureYear - currentDate;
    const diffInDays = Math.ceil(diffInMillSc / (1000 * 60 * 60 * 24));
    result.style.display = "block";
    result.textContent = `До вашего дня рождения осталось ${diffInDays} ${getDayWord(
      diffInDays
    )}`;
  } else {
    const diffInMillSc = BirthDate - currentDate;
    const diffInDays = Math.ceil(diffInMillSc / (1000 * 60 * 60 * 24));
    result.style.display = "block";
    result.textContent = `До вашего дня рождения осталось ${diffInDays} ${getDayWord(
      diffInDays
    )}`;
  }
  if (
    currentDate.getDate() === BirthDate.getDate() &&
    currentDate.getMonth() === BirthDate.getMonth()
  ) {
    result.textContent =
      "Ваш День Рождения сегодня! Поздравляем!!! Happy Birthday!!! Best wishes!!! Enjoy your day!!!";
    /*const img = document.createElement("img");
    img.src = "assets/flowers.jpg";
    img.alt = "greeting picture";
    greeting.append(img); добавление поздравит. картинки на лету*/
  }

  function getDayWord(diffInDays) {
    const lastDigit = diffInDays % 10;
    const lastTwoDigits = diffInDays % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "дней";
    }
    if (lastDigit === 1) {
      return "день";
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return "дня";
    }
    return "дней";
  }
}
