const searchButton = document.querySelector('.search-icon')
const searchInput = document.querySelector('.search-input')
const burgerMenu = document.querySelector('.burger')
const mobileMenu = document.querySelector('.nav')

/*Кнопка пошуку*/
searchButton.addEventListener('click', (event) => {
        event.stopPropagation();
        searchInput.classList.toggle('hidden')
        searchInput.focus()
})
/*Кінець кнопки пошуку */

/*Бургер меню */
burgerMenu.addEventListener('click', () => {
    const display = window.getComputedStyle(mobileMenu).display;
    if (display === 'none') {
        mobileMenu.style.display = 'block';
    } else {
        mobileMenu.style.display = 'none';
    }
})
/*********************************************** */
/*Кінець бургер меню */
document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-input') && !event.target.closest('.search-icon')) {
        searchInput.classList.add('hidden');
    }
})







/*Слайдер перший */
const heroSliderContainer = document.querySelector('.hero-slider-container')
const slideHero = document.querySelector('.slide-hero')
const slides = document.querySelectorAll('.slide') 
const arrayCountSlider = document.querySelectorAll('.count-slide')
let indexSlider = 0
let contIndex = 0


const slidePosition = () => {
    const offset = -indexSlider * 100
    slideHero.style.transform = `translateX(${offset}%)`
}
const nextSlide = () => {
    countSlide(arrayCountSlider)
    indexSlider++
    
    if(indexSlider >= slides.length) {
        indexSlider = 0
        slideHero.style.transition = 'none'
        slidePosition()
        setTimeout(() => {
            slideHero.style.transition = 'transform 0.5s ease-in-out'
            indexSlider = 1;
            slidePosition()
        }, 5)
    } else {
        slidePosition()
    }
}
setInterval(nextSlide, 4000)
/* слайдер перший*/

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
/* Кінець точок на слайдері*/

/**************************************************** */
/*Перевірка форми*/
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

/***************************************/
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
/*************************************** */
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
/***************************************** */
/*Якщо фокус уходить, тоді викликаємо вункцію перевірки*/
autorizationForm.addEventListener('focusout', (event) => {
    autorizationCheck(event)
})
/*************************************************** */
/*При натисканні кнопки надіслати */
autorizationSend.addEventListener('click', (event) => {
    event.preventDefault()
    autorizationCheck()
    if (autorizationLogin && autorizationPassword) {
        autorizationSendButton.textContent = 'Данні відправлені, дякуємо'
    }
})
/*********************************** */
/*Коли фокус находить на елемет обнуляємо помилки */
autorizationForm.addEventListener('focusin', (event) => {
    if(event.target === autorizationNameInput || event.target === autorizationPasswordInput) {
        errorNameAutorization.textContent = ''
        errorPasswordAutorization.textContent = ''
        autorizationSendButton.textContent = ''
    } 
})
/*Закрити модальне вікно бенефитов*/
/*Тарифні плани, модалка*/
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
/*Тарифні плани модалка */

/*Аккордеон птання/відповідь*/
const questionsBlock = document.querySelector('.questionsBlock')
const questionAccordeon = document.querySelectorAll('.question')
const answerAccordeon = document.querySelector('.answer')
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
/*Аккордеон птання/відповідь*/    

/*слайдер второй*/ /*********************************НУЖНО В ФУНКЦИИ */
const stayingSliderContainer = document.querySelector('.staying-slider-container')
const sliderStayingBlock = document.querySelector('.slider-staying-block')
const slideStaying = document.querySelectorAll('.slide-staying') 
const countSlideStaying = document.querySelectorAll('.count-slide-staying')
let indexStaying = 0
let contIndexStaying = 0


const slidePositionStaying = () => {
    const offset = -indexStaying * 100
    sliderStayingBlock.style.transform = `translateX(${offset}%)`
}
const nextSlideStaying = () => {
    countStaying(countSlideStaying)
    indexStaying++
    
    if(indexStaying >= slideStaying.length) {
        indexStaying = 0
        sliderStayingBlock.style.transition = 'none'
        slidePositionStaying()
        setTimeout(() => {
            sliderStayingBlock.style.transition = 'transform 0.5s ease-in-out'
            indexStaying = 1;
            slidePositionStaying()
        }, 5)
    } else {
        slidePositionStaying()
    }
}
setInterval(nextSlideStaying, 3000)
/* слайдер перший*/

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
/*слайдер второй*/

/*Тарифні плани, модалка*/ /**********************НУЖНО В ФУНКЦИЮ */
/*const closeBenefits = document.querySelector('.close-benefits')*/
/*const modalBenefits = document.querySelector('.modalBenefits')*/
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
/*Тарифні плани модалка */

/*Модалка для See more*/
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
/********************************************* */

const storiesText = document.querySelector('.stories-text')
const newReviewUsers = document.createElement('div')
const allReviewUsers = document.querySelectorAll('.review-users')
let widthElement = 0
storiesText.after(newReviewUsers)
newReviewUsers.classList.add('newReviewUsers')

allReviewUsers.forEach(el => {
    newReviewUsers.append(el)
    widthElement = window.getComputedStyle(el).width
    
})
widthElement = parseInt(widthElement);

let countStoriesIndex = 0

const storiesMove = () => {
    if(countStoriesIndex >= allReviewUsers.length) {
        countStoriesIndex = 0
    }
    else {
        const offsetStories = -countStoriesIndex * (widthElement + 30)
        console.log(offsetStories)
        newReviewUsers.style.transform = `translateX(${offsetStories}px)`
        countStoriesIndex++
    }
    
}
setInterval(storiesMove, 1000)