const initialInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");
console.log(initialInput.value);

const numeralToUse = [
  {
    name: "singles",
    small: "I",
    big: "V",
  },
  {
    name: "tens",
    small: "X",
    big: "L",
  },
  {
    name: "hundreds",
    small: "C",
    big: "D",
  },
  {
    name: "thousands",
    small: "M",
    big: "",
  },
];

const romanConverter = (input, divisor = 10) => {
  let number = input;
  let indx = 0;
  let strArr = [];

  while (number > 0) {
    // Looking at the last digit of the number
    let current = number % 10;
    if (current === 0) {
      //if digit is a 4 use small numeral before large (IV, XL, CD)
      //if digit is 9 use small numeral before small of the next column (IX, XC, CM)
      //if digit is in range 5-8 pattern = big + small * remainder (VII, XII,)
      //Otherwise use small as many times as needed
    } else if (current === 4) {
      strArr.push(`${numeralToUse[indx].small}${numeralToUse[indx].big}`);
    } else if (current === 9) {
      strArr.push(`${numeralToUse[indx].small}${numeralToUse[indx + 1].small}`);
    } else if (current > 4) {
      strArr.push(
        `${numeralToUse[indx].big}` +
          `${numeralToUse[indx].small}`.repeat(current % 5)
      );
    } else {
      strArr.push(`${numeralToUse[indx].small}`.repeat(current));
    }
    number -= current;
    number /= 10;
    indx++;
  }
  output.innerText = strArr.reverse().join("");
};

const checkInput = () => {
  const inputInt = parseInt(initialInput.value);
  if (!initialInput.value || isNaN(inputInt)) {
    output.innerText = "Please enter a valid number";
    return;
  } else if (inputInt < 1 || inputInt > 3999) {
    output.innerText = `Please enter a number ${
      inputInt > 1 ? "less" : "greater"
    } than or equal to ${inputInt < 1 ? 1 : 3999}`;
    return;
  } else {
    romanConverter(inputInt);
  }
};

convertBtn.addEventListener("click", () => {
  checkInput(initialInput.value);
});

initialInput.addEventListener("keydown", (e) => {
  if (e.key === "enter") {
    checkInput(initialInput.value);
  }
});
