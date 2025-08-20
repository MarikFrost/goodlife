
//slider - блок слайдера
//interval - інтервал з яким перемикаються слайди у секундах
//animationTime - час самої анімації в секундах. Повинен бути менше за interval
const animationSize = (slider) => {
    let widthSlide = slider.firstElementChild.getBoundingClientRect().width
    let gap = parseInt (window.getComputedStyle(slider).gap) 
    if(isNaN(gap)) { 
        gap = 0
    }
    let sum = widthSlide + gap
    return sum   
}

const copyCutPast = (slider) => {
    const firstChild = slider.firstElementChild
    const newFirstChild = firstChild.cloneNode(true)
    slider.append(newFirstChild)
    return firstChild
}


const slideModule = (slider, interval, animationTime) => {
    interval = interval * 1000
    let sliderSize = animationSize(slider)
    let firstChild  
    let offset  
    setInterval(() => {
        firstChild = copyCutPast(slider)
        
        slider.style.transition = `transform ${animationTime}s ease-in-out`;
        offset = (sliderSize) * (-1)
        slider.style.transform = `translateX(${offset}px)`
    }, interval)

    slider.addEventListener('transitionend', () => {
        slider.style.transition = 'none'; 
        slider.style.transform = `translateX(${0}px)` 
        firstChild.remove() 
        offset = 0 
    })
}

export default slideModule