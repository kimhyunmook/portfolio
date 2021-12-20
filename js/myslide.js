

function myslide(el) {

    let unit, target, control, transition, type; //el
    let c_div, offset_h, offset_w;
    let index = 1;
    let href = window.location.href;

    if (el.target != undefined) target = el.target;
    else target = el;

    if (el.unit != undefined) unit = el.unit;
    else unit = 'px';

    if (el.control != undefined) control = el.control;
    else control = false;

    // transition 
    if (el.transition != undefined) transition = el.transition;
    else transition = 700;

    //dots 
    if (el.dot === undefined) el.dot = false;

    // pageScrollHeight
    switch (el.pageScrollHeight) {
        case undefined:
            el.pageScrollHeight = 200;
            break;
    }

    //type
    switch (el.type) {
        case undefined && 'nomal':
            el.type = 'nomal';
            break;
    }

    type = el.type;
    const children = target.children;

    // scroll_fixed_url
    if (el.type == 'scroll_fixed_url') {
        target.innerHTML = "";
        href = href.split('scroll_fixed=');
        let shref = href[1];
        shref = shref.split('/');


        for (i = 0; i < shref.length; i++) {
            createEl('div', target, 'url_con');
            const url_con = document.querySelectorAll('.url_con');
            shref[i] = decodeURI(shref[i]);
            url_con[i].innerHTML = shref[i];
        }

    }

    if (type == 'nomal') {
        for (let i = 0; i < children.length; i++) {
            children[i].style.width = 100 + "%";
        }

        c_div = document.createElement('div');
        c_div.classList.add('slide-area');
        target.appendChild(c_div);
        const slideArea = c_div;

        c_div = document.createElement('div');
        c_div.classList.add('slide-wrap');
        slideArea.appendChild(c_div);
        // const slideWarp = document.querySelector('.slide-wrap');
        const slideWarp = c_div;
        const slideLen = children.length - 1;

        for (i = 0; i < slideLen; i++) slideWarp.appendChild(children[0]);

        slideWarp.style.width = 100 * (slideLen + 2) + "%";

        const first = slideWarp.children[0].cloneNode(true);
        const last = slideWarp.children[slideLen - 1].cloneNode(true);

        slideWarp.appendChild(first);
        slideWarp.insertBefore(last, slideWarp.firstChild);

        slideWarp.style.transform = `translate3D(-${100/(slideLen+2)}%,0,0)`;

        // control
        if (control === true) {
            c_div = document.createElement('div');
            c_div.classList.add('btn');
            slideArea.appendChild(c_div);
            const btnArea = c_div;
            for (i = 0; i < 2; i++) {
                c_div = document.createElement('div');
                if (i === 0) {
                    c_div.classList.add('left');
                } else {
                    c_div.classList.add('right');
                }
                btnArea.appendChild(c_div);
            }
            const leftBtn = btnArea.children[0];
            const rightBtn = btnArea.children[1];
            let clickflag = true;
            if (clickflag === true) {
            rightBtn.addEventListener('click', function () {
                    clickflag = false;
                    index++;
                    ifCon('-');
                    console.log(clickflag);
                    setTimeout(() => {
                        clickflag = true;
                        console.log(clickflag);
                    }, transition);
                });
            }

            leftBtn.addEventListener('click', function () {
                if (clickflag === true) {
                    clickflag = false;
                    if (index === 0) index = slideLen - 1;
                    else index--;
                    ifCon('-');
                }
                setTimeout(() => {
                    clickflag = true;
                }, transition)
            });
        }

        if (el.dot === true) {
            if (el.dotImg === undefined) el.dotImg === false;

            c_div = document.createElement('div');
            c_div.classList.add('dots');
            target.appendChild(c_div);
            const dots = c_div;

            for (i = 0; i < slideLen; i++) {
                c_div = document.createElement('div');
                c_div.classList.add('dot');
                dots.appendChild(c_div);
                const dot = c_div;
                if (i === 0) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', function () {
                    index = index_(this) + 1;
                    ifCon('-');
                });
            }

            // dottype 
            if (el.dottype === 'img') {
                dots.classList.add('dot-img');
                for (i = 1; i < slideWarp.children.length - 1; i++) {
                    let clone;
                    clone = slideWarp.children[i].cloneNode(true);
                    clone.removeAttribute('style');
                    const dot = dots.children;

                    dot[i - 1].appendChild(clone);
                }
            } else {}
        }


        function ifCon(state) {
            // slideWarp
            for (i = 1; i <= slideLen + 1; i++) {
                if (index === i) {
                    slideWarp.style.transition = transition + 'ms';
                    slideWarp.style.transform = `translate3D(${state+(100/(slideLen+2)*index)}%,0,0)`;
                } else if (index === slideLen + 1) {
                    setTimeout(function () {
                        index = 1;
                        slideWarp.style.transition = 0 + 'ms';
                        slideWarp.style.transform = `translate3D(${state+(100/(slideLen+2)*index)}%,0,0)`;
                    }, transition)
                } else if (index === 0) {
                    slideWarp.style.transition = transition + 'ms';
                    slideWarp.style.transform = `translate3D(${state+(100/(slideLen+2)*index)}%,0,0)`;
                    setTimeout(function () {
                        index = slideLen;
                        slideWarp.style.transition = 0 + 'ms';
                        slideWarp.style.transform = `translate3D(${state+(100/(slideLen+2)*index)}%,0,0)`;
                    }, transition)
                }
            }
            const dot = target.children[1].children;
            for (j = 0; j < dot.length; j++) {
                dot[j].classList.remove('active');
            }

            // dot
            if (el.dot === true) {
                if (index === slideLen + 1) dot[0].classList.add('active');
                else if (index === 0) dot[dot.length - 1].classList.add('active');
                // else if (index === slideLen + 1)
                else dot[index - 1].classList.add('active');
            }
            console.log(slideLen + 1)
            console.log(index);
        }
    } else if (type == 'scroll_fixed' || type == 'scroll_fixed_url') {
        
        const childLen = children.length;
        let pageScrollHeight = el.pageScrollHeight;

        target.style.height = (childLen * pageScrollHeight) + 'vh';

        offset_h = target.offsetHeight;

        target.style.height = offset_h + 'px';

        createEl('div', target, 'cover');

        const cover = document.querySelector('.cover');
        createEl('span',target,'scroll_icon');
        const scrollIcon = document.querySelector('.scroll_icon');
        scrollIcon.innerHTML = '밑으로 스크롤 해주세요!';

        for (i = 0; i < childLen; i++) {
            createEl('div', cover, 'bg')
            const bg = document.querySelectorAll('.bg');
            bg[i].appendChild(children[0]);

        }
        const bg = document.querySelectorAll('.bg');
        let item;
        for (i = 0; i < childLen; i++) {
            item = bg[i].children[0];
            item.classList.add('item');
            bg[i].style.height = pageScrollHeight + 'vh';
            offset_h = bg[i].offsetHeight;
            bg[i].style.height = offset_h + 'px';
            item.style.transition = transition + 'ms';
        }

        item = document.querySelectorAll('.item');

        window.addEventListener('scroll', function () {
            let winTop = window.pageYOffset;
            if (winTop > target.offsetTop && winTop < target.offsetTop + target.offsetHeight) cover.style.position = 'fixed';
            else cover.style.position = 'static';

            console.log(target.offsetTop);

            for (i = 0; i < childLen; i++) {
                if (i == childLen - 1) {
                    if (winTop > bg[i].offsetTop - 200) {
                        item[i].classList.add('on');
                    } else {
                        item[i].classList.remove('on')
                    }
                } else {
                    if (winTop > bg[i].offsetTop && winTop < bg[i + 1].offsetTop - 100) {
                        item[i].classList.add('on');
                    } else {
                        item[i].classList.remove('on')
                    }
                }

            }
        })
    }


    function index_(el1) {
        return [].indexOf.call(el1.parentNode.children, el1);
    }

    function createEl(el, el2, cl) {
        el = document.createElement(el);
        if (cl != undefined) el.classList.add(cl);
        el2.appendChild(el);
    }

}