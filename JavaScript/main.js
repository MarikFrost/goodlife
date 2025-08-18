import slideModule from './../modules/myCustomSlider.mjs'
import automaticSliderWithManualControl from './../modules/AutoHandSlider.mjs'
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

automaticSliderWithManualControl(arrayCountSlider, slideHero, 'count-slide-hover', 4, 0.5)
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

automaticSliderWithManualControl(countSlideStaying, sliderStayingBlock, 'count-slide-staying-hover', 4, 0.5)
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
const vp900 = window.matchMedia('(max-width: 900px)')

const widthChange900 = (e) => {
    if(e.matches){
        storiesText.after(newReviewUsers)
        newReviewUsers.classList.add('newReviewUsers')
        allReviewUsers.forEach(el => {
            newReviewUsers.append(el)
        })
    } else {
        newReviewUsers.classList.remove('newReviewUsers')
        allReviewUsers.forEach(el => {
            storiesText.after(el)
        })
        newReviewUsers.remove()
    }
}
widthChange900(vp900)
vp900.addEventListener("change", widthChange900);

//на 800 запускаємо слайдер
const vp800 = window.matchMedia('(max-width: 800px)')
const widthChange800 = (e) => {
    if(e.matches){
        slideModule(newReviewUsers, 3, 1)
    }
}
widthChange800(vp800)
vp800.addEventListener("change", widthChange800);
/**************Слайдер Review************* */

