
//slider - блок слайдера
//interval - інтервал з яким перемикаються слайди у секундах
//animationTime - час самої анімації в секундах. Повинен бути менше за interval


const slideModule = (slider, interval, animationTime) => {
    interval = interval * 1000
    setInterval(() => {
        /* let widthSlide = window.getComputedStyle(slide[0]).width
        widthSlide = parseInt(widthSlide)*/
        /*Закоментовано теж саме що і код нижче. За допомогою цього коду ми можемо
        вказазувати -1 аргумент (а саме сам один слайд) щоб дізнатись його ширину*/
        let widthSlide = parseInt(
            window.getComputedStyle(slider.firstElementChild).width
        ) //дізнаємось ширину слайда, щоб розуміти на скільки зсовувати
        
        let gap = parseInt (window.getComputedStyle(slider).gap) 
        //дузнаємось відступ між слайдами
        if(isNaN(gap)) { //якщо gap не заданий в CSS то він буде NaN
            gap = 0
        }

        const firstChild = slider.firstElementChild
        //беремо перший елемент слайдеру
        const newFirstChild = firstChild.cloneNode(true)
        //клонуємо його
        slider.append(newFirstChild)
        //та вставляємо його вкінець

        slider.style.transition = `transform ${animationTime}s ease-in-out`;
        //застосовуємо свойство здвигу
        let offset = (widthSlide + gap) * (-1)
        //визначаємо на яку відстань пудемо передвигати (ширина ел. + відступ * -1)
        slider.style.transform = `translateX(${offset}px)`
        //сдвигаємо слайдер на цю відстань
        
        setTimeout(() =>{ //плавно з анимацією з інтервалом в 1 секунду
            slider.style.transition = 'none'; //вимикаємо свойство сдвигу
            slider.style.transform = `translateX(${0}px)` //повертаємо блок назад
            firstChild.remove() //видаляємо перший елемент
            offset = 0 //обнуляємо відстань
        },animationTime * 1000)
    }, interval)
}

export default slideModule