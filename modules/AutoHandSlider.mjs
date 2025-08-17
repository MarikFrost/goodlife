/*
Автоматичний слайдер з ручним управлінням приймає: 
1) Всі кнопки ручного управління
2) Блок зі слайдами
3) Класс який додаємо щоб зрозуміти яка кнопка була натиснута
4) Інтервал між анімацією в секундах
5) Час анімації
*/
const automaticSliderWithManualControl = (countHandButton, blockWithItemSlide, classAdd, timeOfMoveSlide, timeOfAnimation) => {

    let indexTest = 0
    let inst = 0
    let offset = 0
    let firstChild
    let newFirstChild
    let widthSlide

    let startX = 0

    blockWithItemSlide.addEventListener('mousedown', e => {
    startX = e.clientX
    })

    blockWithItemSlide.addEventListener('mouseup', e => {
        
    let diff = e.clientX - startX
    console.log(diff)
    if (diff > 50) {
        updateClass(countHandButton, index + 1)
        updateList(blockWithItemSlide, index + 1)
    } else if (diff < -50) {
        updateClass(countHandButton, index - 1)
        updateList(blockWithItemSlide, index - 1)
    }
    })


    /*
    Функція обробника натиску. Приймає:
    1) Блок кнопок з ручним управлінням
    2) Блок зі слайдами
    */
    const clickEl = (countHandButton, blockWithItemSlide) => {
        countHandButton.forEach((el, index) => {
            el.addEventListener('click', (event) =>{
                event.preventDefault()
                updateClass(countHandButton, index) //викликаємо функцію (реакції автоматичного переліку на клік)
                updateList(blockWithItemSlide, index) // викликаємо функцію (реакції автоматичного слайдеру на клік)
                indexTest = index //синхронізуємо індекс натиску та індекс переліку елементі
                inst = index //синхронізуємо індекс натиску та індекс автоматичного слайдеру
            })
        })  
    }

    /*
    Реакція автоматичного слайдеру на клік. Приймає:
    1) Блок зі слайдами
    2) Індекс кнопки на яку натиснули
    */
    const updateList = (blockWithItemSlide, index) => { 
        Array.from(blockWithItemSlide.children).forEach((el, i) => {
            if(index === i) {
                let gap = parseInt (window.getComputedStyle(blockWithItemSlide).gap) 
                if(isNaN(gap)) { 
                    gap = 0
                }
                for(let a = 0; a <= i; a++) {
                    widthSlide = blockWithItemSlide.children[index].getBoundingClientRect().width
                    copyClonePast(blockWithItemSlide, a) //виклик функції копіювати/клопунати/вставити
                    blockWithItemSlide.style.transition = 'transform 0.2s ease-in-out'
                    offset = (widthSlide + gap) * -(index)
                    blockWithItemSlide.style.transform = `translateX(${offset}px)`
                }    
            }
        })
    }

    /*
    Реакція кнопок ручного перемикання на клік. Приймає:
    1) Блок з кнопками ручного керування
    2) Індекс кнопки на яку натиснули
    */
    const updateClass = (countHandButton, index) => { 
        countHandButton.forEach((el, i) => {
            if(index === i) {
                el.classList.add(`${classAdd}`)
            } else {
                el.classList.remove(`${classAdd}`)
            }
        })
    }

    /*
    Функція копіювати/клонувати/вставити. Приймає:
    1) Блок зі слайдами
    2) Індекс слайдів які треба копіювати/клонувати/вставити
    */
    const copyClonePast = (blockWithItemSlide, index) => { 
        firstChild = blockWithItemSlide.children[index]
        newFirstChild = firstChild.cloneNode(true)
        blockWithItemSlide.append(newFirstChild)
    }







    timeOfMoveSlide = timeOfMoveSlide * 1000
    setInterval(() => {
        inst++
        indexTest++

        if(indexTest >= countHandButton.length) {
            countHandButton[indexTest - 1].classList.remove(`${classAdd}`)
            indexTest = 0 
            countHandButton[indexTest].classList.add(`${classAdd}`) 
        } else if (indexTest > 0) {
            countHandButton[indexTest - 1].classList.remove(`${classAdd}`)
            countHandButton[indexTest].classList.add(`${classAdd}`)
        }    

        if(inst > blockWithItemSlide.children.length) {
            setTimeout(() =>{ 
                blockWithItemSlide.style.transition = 'none'; 
                blockWithItemSlide.style.transform = `translateX(${0}px)` 
                for(let i = blockWithItemSlide.length - 1; i >= 0; i--) {
                    blockWithItemSlide.children[i].remove()
                }
            }, 1)
            inst = 0
            offset = 0 
        } else if(inst > 0) {
            let gap = blockWithItemSlide.getBoundingClientRect().gap
            if(isNaN(gap)) { 
                gap = 0
            }
            if(inst === 1) {
                copyClonePast(blockWithItemSlide, inst - 1) //викликаємо функцію копіювати/клонувати/вставити
            }
            widthSlide = blockWithItemSlide.children[inst].getBoundingClientRect().width
            copyClonePast(blockWithItemSlide, inst) //викликаємо функцію копіювати/клонувати/вставити
            blockWithItemSlide.style.transition = `transform ${timeOfAnimation}s ease-in-out`
            offset = (widthSlide + gap) * -(inst)
            blockWithItemSlide.style.transform = `translateX(${offset}px)`
        }   
    }, timeOfMoveSlide)
    clickEl(countHandButton, blockWithItemSlide)
} 

export default automaticSliderWithManualControl