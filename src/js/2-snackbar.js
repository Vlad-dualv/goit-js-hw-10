import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const promise = new Promise((resolve, reject) => {
        const delayInput = event.currentTarget.elements.delay.value;
        const stateInput = event.currentTarget.elements.state.value;

    setTimeout(() => {
            if (delayInput && stateInput === "fulfilled") {
                resolve(delayInput);
                console.log(`✅ Fulfilled promise in ${delayInput}ms`);
            } else {
                reject(delayInput);
                console.log(`❌ Rejected promise in ${delayInput}ms`);
            }
        }, delayInput);
    });

    promise.then((delayInput) => {
        iziToast.success({
            title: "OK",
            message: `Fulfilled promise in ${delayInput}ms`,
            position: "topRight",
        });
    }).catch((delayInput) => {
        iziToast.error({
            title: "Error",
            message: `Rejected promise in ${delayInput}ms`,
            position: "topRight",
        });
    });
    
});

/*
з того, що вже бачу:
1 - (сама так намагалася, але це погано працює) до delayInput та stateInput краще добиратися через елементи форми.
 І для цього їх треба передати в сам цикл.
  Тобто, в промісі перед іф ставиш ці дві константи і добираєшься до них так - e.currentTarget.elements.delay.value;
і для стейт аналогічно
2 - в тебе блок іф має бути всередені таймауту, а не навпаки, тому що таймаут в будьякому випадку має спрацьовувати і на фулфілд і на режект
3 - (сама цю помилку зробила, через це дз не прийняли з першого разу) в тебе консоль.
лог має бути в блоку іф, там де резолв і режект, але не в якості аргумента, а просто знизу, як я зрозуміла.
 Це ще не перевірено) але точно не має бути в кетчі та зені. А в кетчі та зені маєш використати бібліотеку тост, щоб видати повідомлення
 */