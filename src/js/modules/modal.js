function closing(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show', 'fade');
    document.body.style.overflow = '';
}

function opening(modalSelector, setModalInterval) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(setModalInterval){
        clearInterval(setModalInterval);
    }
}


function modal(callSelector, modalSelector, setModalInterval) {
    const callModalBtn = document.querySelectorAll(callSelector),
          modal = document.querySelector(modalSelector);


    function showAndHideModal(callButton, selector) {
        callButton.forEach(button => {
            button.addEventListener('click', () => opening(modalSelector, setModalInterval));
        });

        selector.addEventListener('click', event => {
            if (event.target.classList.contains('modal') || event.target.getAttribute('data-close') == '') {
                closing(modalSelector);
            }
        });

        document.addEventListener('keydown', event => {
            if (event.code === 'Escape' && selector.classList.contains('show')) {
                closing(modalSelector);
            }
        });
    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            opening(modalSelector, setModalInterval);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    showAndHideModal(callModalBtn, modal);

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {opening};
export {closing};