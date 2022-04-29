
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu){
    iconMenu.addEventListener('click', function(e){
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
        document.body.classList.toggle('lock');
    })
}

if (menuLinks.length>0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuClick);
        
    });

    function onMenuClick(e){
        const menuLink = e.target;
        console.log(document.querySelector(menuLink.dataset.goto));
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - 120;
            console.log(gotoBlockValue);

            if(iconMenu.classList.contains('active')){
                iconMenu.classList.remove('active');
                menuBody.classList.remove('active');
                document.body.classList.remove('lock');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior : "smooth"
            })
            e.preventDefault();
        }
    }
}