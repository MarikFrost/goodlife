//import slideModule from './../modules/myCustomSlider.mjs'

/*********************Кнопка пошуку********************/
const searchButton = document.querySelector('.search-icon')
const searchInput = document.querySelector('.search-input')
/*Відкриття пошуку*/
searchButton.addEventListener('click', (event) => {
        event.stopPropagation();
        searchInput.classList.toggle('hidden')
        searchInput.focus()
})
/*Закриття пошуку */
document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-input') && !event.target.closest('.search-icon')) {
        searchInput.classList.add('hidden');
    }
})
/*******************Кінець кнопки пошуку *********************/

/******************************Бургер меню****************/
const burgerMenu = document.querySelector('.burger')
const mobileMenu = document.querySelector('.nav')
burgerMenu.addEventListener('click', () => {
    const display = window.getComputedStyle(mobileMenu).display;
    if (display === 'none') {
        mobileMenu.style.display = 'block';
    } else {
        mobileMenu.style.display = 'none';
    }
})
/******************************Кінець бургер меню **************/

/*********************Слайдер перший ********************/
const slideHero = document.querySelector('.slide-hero')
const arrayCountSlider = document.querySelectorAll('.count-slide')
let contIndex = 0

//slideModule(slideHero, 4, 0.5)
setInterval(() => {
    countSlide(arrayCountSlider)
}, 4000)

/*Точки на слайдері */
const countSlide = (array) => {
    contIndex++
    if(contIndex >= array.length) {
        array[contIndex - 1].classList.remove('count-slide-hover')
       contIndex = 0 
       array[contIndex].classList.add('count-slide-hover')
    } else if(contIndex > 0) {
        array[contIndex - 1].classList.remove('count-slide-hover')
    } 
    array[contIndex].classList.add('count-slide-hover')
}
/*********************Слайдер перший ********************/

/************************Перевірка форми login********************/
const modalWindow = document.querySelector('body') /*БОДІ для модального вікна*/
const modalButtonLogin = document.querySelectorAll('.form-login') /*кнопка login*/
const modalLogin = document.querySelector('.modalLogin') /*модальне вікно на весь екран*/
const autorizationForm = document.querySelector('.autorization') /*Форма*/
const autorizationCancel = document.querySelector('.autorizationCancel') /*Кнопка скасувати*/
const autorizationNameInput = document.querySelector('.autorizationNameInput') /*Поле ввода логіну*/
const errorNameAutorization = document.querySelector('.errorNameAutorization') /*Поле помилки для логіну*/
const autorizationPasswordInput = document.querySelector('.autorizationPasswordInput') /*Поле вводу пароля*/
const errorPasswordAutorization = document.querySelector('.errorPasswordAutorization') /*Поле помилки для паролю */
const autorizationSend = document.querySelector('.autorizationSend') /*Кнопка надіслати */
const autorizationSendButton = document.querySelector('.autorizationSendButton') /*Поле помилки для кнопки надіслати*/
let autorizationLogin = true /*Якщо немає помилки у логіні, то буде true */
let autorizationPassword = true /*Якщо немає помилки у паролі, то буде true */


/*При кліку на кнопку login */
modalButtonLogin.forEach(el => {
    el.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        modalLogin.classList.remove('hidden')
        modalWindow.classList.add('modal-open')
        modalLogin.classList.add('login-block')
        autorizationNameInput.focus()
    })
})  

/*При натискані на кнопку скасувати */
autorizationCancel.addEventListener('click', () => {
    modalLogin.classList.add('hidden')
    modalWindow.classList.remove('modal-open')
    modalLogin.classList.remove('login-block')


    // Очищуємо поля і помилки при закритті
    autorizationNameInput.value = '';
    autorizationPasswordInput.value = '';
    errorNameAutorization.textContent = '';
    errorPasswordAutorization.textContent = '';
    autorizationSendButton.textContent = '';
})

/*ФУНКЦІЯ ДЛЯ ПЕРЕВІРКИ ПРАВИЛЬНОСТІ ВВОДА У ПОЛЯ ЛОГІН ТА ПАРОЛЬ*/
const autorizationCheck = (event) => {
    if(event) {
        if(event.target === autorizationNameInput) {
            if(!autorizationNameInput.value || autorizationNameInput.value.length < 6) {
                errorNameAutorization.textContent = 'Ви ввели неправильний login'
                autorizationLogin = false
            } else {
                autorizationLogin = true
                errorNameAutorization.textContent = ''
            }
        } else if(event.target === autorizationPasswordInput) {
            if(!autorizationPasswordInput.value || autorizationPasswordInput.value.length < 6) {
                errorPasswordAutorization.textContent = 'Ви ввели невірний пароль'
                autorizationPassword = false
            }
            else {
                autorizationPassword = true
                errorPasswordAutorization.textContent = ''
            }
        }
    } else {
        if(!autorizationNameInput.value || autorizationNameInput.value.length < 6) {
            errorNameAutorization.textContent = 'Ви ввели неправильний login'
            autorizationLogin = false
        } else {
            autorizationLogin = true
            errorNameAutorization.textContent = ''
        }

        if(!autorizationPasswordInput.value || autorizationPasswordInput.value.length < 6) {
            errorPasswordAutorization.textContent = 'Ви ввели невірний пароль'
            autorizationPassword = false
        } else {
            autorizationPassword = true
            errorPasswordAutorization.textContent = ''
        }
    }
}

/*Якщо фокус уходить, тоді викликаємо вункцію перевірки*/
autorizationForm.addEventListener('focusout', (event) => {
    autorizationCheck(event)
})

/*При натисканні кнопки надіслати */
autorizationSend.addEventListener('click', (event) => {
    event.preventDefault()
    autorizationCheck()
    if (autorizationLogin && autorizationPassword) {
        autorizationSendButton.textContent = 'Данні відправлені, дякуємо'
    }
})

/*Коли фокус находить на елемет обнуляємо помилки */
autorizationForm.addEventListener('focusin', (event) => {
    if(event.target === autorizationNameInput || event.target === autorizationPasswordInput) {
        errorNameAutorization.textContent = ''
        errorPasswordAutorization.textContent = ''
        autorizationSendButton.textContent = ''
    } 
})
/************************Перевірка форми login********************/

/********************Тарифні плани, модалка*****************/
const closeBenefits = document.querySelector('.close-benefits')
const modalBenefits = document.querySelector('.modalBenefits')
const heroBenefits = document.querySelector('.hero-benefits')

heroBenefits.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    modalBenefits.classList.remove('hidden')
    modalWindow.classList.add('modal-open')
})

closeBenefits.addEventListener('click', () => {
    modalBenefits.classList.add('hidden')
    modalWindow.classList.remove('modal-open')
})
/************************Тарифні плани модалка******************/

/******************Аккордеон птання/відповідь***************/
const questionsBlock = document.querySelector('.questionsBlock')
const questionAccordeon = document.querySelectorAll('.question')
const faqButton = document.querySelector('.FAQ')

faqButton.addEventListener('click', () => {
    questionsBlock.classList.toggle('hidden')
})

questionAccordeon.forEach(el => {
    el.addEventListener('click', () => {
        el.querySelector('img').classList.toggle('questionImgRotate')
        const nextElAnswer = el.nextElementSibling
    if(nextElAnswer.style.height === '0px' || nextElAnswer.style.height === '') {
        nextElAnswer.style.height = `${nextElAnswer.scrollHeight}px`
    } else {
        nextElAnswer.style.height = '0px'
    }
  })  
})
const questionsBlockClose = document.querySelector('.questionsBlockClose')
questionsBlockClose.addEventListener('click', () => {
    questionsBlock.classList.add('hidden')
})
/******************Аккордеон птання/відповідь*****************/    

/***************************Cлайдер второй********************/ 
const sliderStayingBlock = document.querySelector('.slider-staying-block')
const countSlideStaying = document.querySelectorAll('.count-slide-staying')
let contIndexStaying = 0

//slideModule(sliderStayingBlock, 3, 0.5)
setInterval(() => {
    countStaying(countSlideStaying)
}, 3000)

/*Точки на слайдері */ 
const countStaying = (array) => {
    contIndexStaying++
    if(contIndexStaying >= array.length) {
        array[contIndexStaying - 1].classList.remove('count-slide-staying-hover')
       contIndexStaying = 0 
       array[contIndexStaying].classList.add('count-slide-staying-hover')
    } else if(contIndexStaying > 0) {
        array[contIndexStaying - 1].classList.remove('count-slide-staying-hover')
    } 
    array[contIndexStaying].classList.add('count-slide-staying-hover')
}
/***************************Cлайдер второй********************/ 

/************************Тарифні плани, модалка**************/ 
const stayingBenefits = document.querySelector('.staying-benefits')

stayingBenefits.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    modalBenefits.classList.remove('hidden')
    modalWindow.classList.add('modal-open')
})

closeBenefits.addEventListener('click', () => {
    modalBenefits.classList.add('hidden')
    modalWindow.classList.remove('modal-open')
})
/*******************Тарифні плани модалка**************/

/*******************Модалка для See more***************/
const closePremiumModal = document.querySelector('.close-premium-more')
const premiumMore = document.querySelector('.premium-more')
const buttonPlanInModalPremium = document.querySelector('.premium-modal > button')
const openPremiumModal = document.querySelector('.open-premium-modal')

closePremiumModal.addEventListener('click', () => {
    modalWindow.classList.remove('modal-open')
    premiumMore.classList.add('hidden')
})

buttonPlanInModalPremium.addEventListener('click', () => {
    modalBenefits.classList.remove('hidden')
    premiumMore.classList.add('hidden')
})
openPremiumModal.addEventListener('click', () => {
    modalWindow.classList.add('modal-open')
    premiumMore.classList.remove('hidden')
})
/*******************Модалка для See more***************/

/**************Слайдер Review************* */
const storiesText = document.querySelector('.stories-text')
const newReviewUsers = document.createElement('div')
const allReviewUsers = document.querySelectorAll('.review-users')
//додаємо блок та переміщуємо туди елементи для слайдеру
if(window.innerWidth <= 900) {
    storiesText.after(newReviewUsers)
    newReviewUsers.classList.add('newReviewUsers')
    allReviewUsers.forEach(el => {
        newReviewUsers.append(el)
        el.classList.remove('hidden')
    })
}
//Запускаємо слайдер
 if(window.innerWidth < 800) {
    //slideModule(newReviewUsers, 3, 1)
 }
/**************Слайдер Review************* */


const containetSlider = document.querySelector('.containetSlider')
const testItem = document.querySelectorAll('.testItem')
const countTest = document.querySelectorAll('.countTest')
let indexTest = 0
let inst = 0
let offset = 0
let firstChild
let newFirstChild
let widthSlide

//Сравниваем индекси натисків з автоматичними. Та присваюємо
const clickEl = (countTest, containetSlider) => {
    countTest.forEach((el, index) => {
        el.addEventListener('click', (event) =>{
            event.preventDefault()
            updateClass(countTest, index)
            updateList(containetSlider, index)
            indexTest = index
            inst = index
        })
    })  
}
//реакція автоматичного переліку на клік
const updateClass = (array, index) => {
    array.forEach((el, i) => {
        if(index === i) {
            el.classList.add('active')
        } else {
            el.classList.remove('active')
        }
    })
}
//реакція автоматичного слайдеру на клік
const updateList = (array, index) => {
    Array.from(array.children).forEach((el, i) => {
        if(index === i) {
            let gap = parseInt (window.getComputedStyle(array).gap) 
            if(isNaN(gap)) { 
                gap = 0
            }
            for(let a = 0; a <= i; a++) {
                let widthSlide = parseInt(window.getComputedStyle(array.children[a]).width)
                const firstChild = array.children[a]
                const newFirstChild = firstChild.cloneNode(true)
                array.append(newFirstChild)
                array.style.transition = 'transform 0.2s ease-in-out'
                offset = (widthSlide + gap) * -(index)
                array.style.transform = `translateX(${offset}px)`
            }    
        }
    })
}

//Автоматичний слайдер
const countTestFunc = (countTest, containetSlider, testItem) => {
    inst++
    indexTest++

    if(indexTest >= countTest.length) {
        countTest[indexTest - 1].classList.remove('active')
        indexTest = 0 
        countTest[indexTest].classList.add('active') 
    } else if (indexTest > 0) {
        countTest[indexTest - 1].classList.remove('active')
        countTest[indexTest].classList.add('active')
    }    

    if(inst > containetSlider.children.length) {
        setTimeout(() =>{ 
            containetSlider.style.transition = 'none'; 
            containetSlider.style.transform = `translateX(${0}px)` 
            for(let i = containetSlider.length - 1; i >= 0; i--) {
                containetSlider.children[i].remove()
            }
        }, 1)
        inst = 0
        offset = 0 
    } else if(inst > 0) {
        let gap = parseInt (window.getComputedStyle(containetSlider).gap) 
        if(isNaN(gap)) { 
            gap = 0
        }
        if(inst === 1) {
            widthSlide = parseInt(window.getComputedStyle(containetSlider.children[inst - 1]).width)
            firstChild = containetSlider.children[inst - 1]
            newFirstChild = firstChild.cloneNode(true)
            containetSlider.append(newFirstChild)
        }
        widthSlide = parseInt(window.getComputedStyle(containetSlider.children[inst]).width)
        firstChild = containetSlider.children[inst]
        newFirstChild = firstChild.cloneNode(true)
        containetSlider.append(newFirstChild)
        containetSlider.style.transition = 'transform 0.5s ease-in-out'
        offset = (widthSlide + gap) * -(inst)
        containetSlider.style.transform = `translateX(${offset}px)`
    }   
} 


setInterval(() => {
    countTestFunc(countTest, containetSlider, testItem)
}, 4000)
clickEl(countTest, containetSlider)
