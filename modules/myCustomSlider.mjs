/*Автоматичний слайдер з можливістю ручного управління тільки свайпом*/
//1) slider - блок слайдера
//2) interval - інтервал з яким перемикаються слайди у секундах
//3) animationTime - час самої анімації в секундах. Повинен бути менше за interval


const slideModule = (slider, interval, animationTime) => {
    interval = interval * 1000
    let firstChild
    let offset = 0
    let startX = 0
    let newFirstChild
    let widthSlide
    let gap = parseInt (window.getComputedStyle(slider).gap) 
    if(isNaN(gap)) { //якщо gap не заданий в CSS то він буде NaN
        gap = 0
    }
    let isTrue = true

    slider.addEventListener('mousedown', e => { // Для миші
        startX = e.clientX
        isTrue = false
    })
    window.addEventListener('mouseup', e => {
        handleSwipe(e.clientX)
    })
    slider.addEventListener('touchstart', e => { // Для тачів (телефон)
        startX = e.touches[0].clientX
        isTrue = false
    })
    window.addEventListener('touchend', e => {
        handleSwipe(e.changedTouches[0].clientX)
    })

    function handleSwipe(endX) {
        let diff = endX - startX
        if (diff > 50) {
            widthSlide = slider.lastElementChild.getBoundingClientRect().width
            slider.style.transition = `transform ${0.000001}s ease-in-out`
            offset = (widthSlide + gap)
            firstChild = slider.lastElementChild
            newFirstChild = firstChild.cloneNode(true)
            slider.prepend(newFirstChild)
            slider.style.transform = `translateX(${-offset}px)`
            slider.lastElementChild.remove()
            
            setTimeout(() =>{
                slider.style.transition = `transform ${animationTime}s ease-in-out`
                slider.style.transform = `translateX(${0}px)`
                
            }, 10)   
        } else if (diff < -50) {
            console.log('Вперед')
            widthSlide = slider.children[1].getBoundingClientRect().width
            firstChild = slider.firstElementChild
            newFirstChild = firstChild.cloneNode(true)
            slider.style.transition = `transform ${animationTime}s ease-in-out`
            offset = (widthSlide + gap)
            slider.style.transform = `translateX(${-offset}px)`
            
            setTimeout(() => {
                slider.append(newFirstChild)
                slider.firstChild.remove()
                slider.style.transition = 'none'
                slider.style.transform = 'translateX(0px)'   
            }, animationTime * 1000)   
        }
        setTimeout(() =>{
            isTrue = true
        }, animationTime * 1000)
    }

    setInterval(() => {
        if(isTrue === true) {
            widthSlide = slider.firstElementChild.getBoundingClientRect().width       
            firstChild = slider.firstElementChild
            newFirstChild = firstChild.cloneNode(true)
            slider.append(newFirstChild)

            slider.style.transition = `transform ${animationTime}s ease-in-out`;
            offset = (widthSlide + gap) * (-1)
            slider.style.transform = `translateX(${offset}px)`

            setTimeout(() =>{ 
                slider.style.transition = 'none'; 
                slider.style.transform = `translateX(${0}px)` 
                firstChild.remove() 
                offset = 0 
            },animationTime * 1000)
        }
    }, interval)
}

export default slideModule