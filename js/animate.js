
let load = document.querySelectorAll('.scroll');

    function onScroll(event){
        for(let i =0; i<load.length; i++){
            let item = load[i];
            let loadHeight = item.offsetHeight;
            let itemOffset = offset(item).top;
            let animStart = 4;

            let animItemPoint = window.innerHeight - loadHeight / animStart;
            
            if(loadHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > itemOffset- animItemPoint) && pageYOffset < (itemOffset + loadHeight)) {
                item.classList.add('active');
            }else{
                item.classList.remove('active');
            }
        }
    }
    function offset(el){
        let rect = el.getBoundingClientRect(),
            scrollLeft = pageXOffset || document.documentElement.scrollLeft,
            scrollTop = pageYOffset || document.documentElement.scrollTop;
        return {top : rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    onScroll();
    window.addEventListener('scroll', onScroll);
