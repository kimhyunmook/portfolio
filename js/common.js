let i, i2, i3, clone;

//logo
const logo = document.querySelector('.logo');

function logo_() {
    let cre_p = document.createElement('p');
    cre_p.innerHTML = 'LOGO'
    logo.appendChild(cre_p);
}
// logo_();

// createEl
function createEl(el, target, class1) {
    let create = document.createElement(el);
    target.appendChild(create);
    if (class1 != undefined) create.classList.add(class1)
}

//cube 
function Cube(target,type,content) {
    if(type === 'cube' || type === undefined) {
        createEl('div',target,'top');
        createEl('ul',target);
    
        for(i=0;i<4;i++) {
            createEl('li',target.children[1]);
            let li = target.children[1].children;
            li[i].setAttribute('style','--i:'+i+';');
            if(Array.isArray(content) === true) {
                li[i].innerHTML = content[i];
            }
        }
    } else if(type === 'circle') {
        target.classList.add('circle');
        if(content ===undefined) {
            content = 10;
        }
        createEl('ul',target)
        for(i=0;i<content;i++) {
            createEl('li',target.children[0]);
            let li = target.children[0].children;
            li[i].setAttribute('style','--i:'+i+';');
        }
    }
}
const cube = document.querySelectorAll('.cube');
Cube(cube[0],'circle',50);
Cube(cube[1]);
Cube(cube[2],'cube',[
    '<i class="fab fa-html5" aria-hidden="true"></i>',
    '<i class="fab fa-js-square" aria-hidden="true"></i>',
    '<i class="fab fa-node-js" aria-hidden="true"></i>',
    '<i class="fab fa-php" aria-hidden="true"></i>'
]);

//json Header//
(() => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = (e) => {
        let req = e.target;
        const jsonCon = req.responseText;

        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                let param = JSON.parse(jsonCon);
                const contentArea = document.querySelector('.content-area');
                const coverHeader = document.querySelector('#cover-header');
                const mainNav = document.querySelector('#main-nav');
                const mainSection = document.querySelector('#main-section');
                const github = document.querySelector('.github');

                function clickEvent (condition) {
                    const scroll_b = document.querySelectorAll('.scroll-b');
                    let subNav = document.querySelector('.subNav');
                    const subNav_a  = document.querySelectorAll('.subNav #main-nav li > a');
                    e.preventDefault();
                    if(condition == 'home') {
                        coverHeader.classList.remove('on');
                        github.classList.remove('on');
                        subNav.classList.remove('on');

                        for (i = 0; i < param.length; i++) {
                            mainSection.children[i].classList.remove('on');
                        }
                    } else {
                        coverHeader.classList.add('on');
                        subNav.classList.add('on');
                        for (i = 0; i < param.length; i++) {
                            mainSection.children[i].classList.remove('on');
                            subNav_a[i].parentNode.classList.remove('on');
                            github.classList.add('on');
                            if (this.dataset.name === mainSection.children[i].classList[0]) {
                                mainSection.children[i].classList.add('on');
                                scroll_b[i].classList.add('y');
                                subNav_a[i].parentNode.classList.add('on');
                            } 
                        }
                    }
                }
              
                for (i = 0; i < param.length; i++) {
                    createEl('li', mainNav);
                    const mainNavChildren = mainNav.children[i]
                    createEl('a', mainNavChildren);

                    let mNla = document.querySelectorAll('#main-nav li a');
                    // font awesome 
                    let icon = param[i].icon
                    if (icon != undefined) {
                        mNla[i].innerHTML = `<i class="${icon}"></i>`;
                        for(i2=0; i2<1; i2++) {
                            createEl('span',mainNavChildren,'xMark1');
                            createEl('span',mainNavChildren,'xMark2');
                        } 
                    }

                    const mainNavChildren_a = mainNavChildren.children[0]
                    if (mainNavChildren_a.nodeName === 'A') {
                        mainNavChildren_a.setAttribute('data-name', param[i].title)
                        if (param[i].href != undefined) {
                            mainNavChildren_a.href = param[i].href;
                        } else {
                            mainNavChildren_a.href = "#";
                            mainNavChildren_a.addEventListener('click',clickEvent);
                        }
                        createEl('p', mainNavChildren_a);
                        const thisTitle = document.querySelectorAll('#main-nav li a > p');
                        thisTitle[i].innerHTML = param[i].title;

                        // main-section article
                        createEl('article', mainSection, param[i].title);
                    }
                }

                //subNav
                createEl('nav',contentArea,'subNav');
                const subNav = document.querySelector('.subNav');
                const mainNavClone = mainNav.cloneNode(true);
                subNav.appendChild(mainNavClone);
                //homebtn
                createEl('li',mainNavClone,'homebtn');
                const homebtn = document.querySelector('.subNav .homebtn');
                homebtn.innerHTML ='<i class="fas fa-home"></i>';
                homebtn.addEventListener('click',()=>{
                    clickEvent('home');
                });
                createEl('div',subNav,'subNavBtn');
                const subNavBtn = document.querySelector('.subNavBtn');
                // subNavBtn.innerHTML = '<i class="fas fa-angle-double-right"></i>';
                subNavBtn.addEventListener('click',function(e){
                    e.preventDefault();
                    subNav.classList.add('on');
                })
                const subNav_p = document.querySelectorAll('.subNav p');
                for(i=0;i<subNav_p.length;i++) {
                    subNav_p[i].remove();
                }
                const subNav_li_a = document.querySelectorAll('.subNav li a');
                for(i=0;i<subNav_li_a.length;i++) {
                    subNav_li_a[i].addEventListener('click',clickEvent);
                }

                // template
                const template = document.querySelectorAll('template');
                let backIcon;

                for (i2 = 0; i2 < template.length; i2++) {
                    if (mainSection.children[i2].classList[0] === template[i2].id) {
                        clone = document.importNode(logo, true);
                        clone.innerHTML = param[i2].title;
                        mainSection.children[i2].appendChild(clone);
                        clone = document.importNode(template[i2].content, true);
                        mainSection.children[i2].appendChild(clone);

                        // const scroll_b = document.querySelectorAll('#main-section article .scroll-b')

                        const article_logo = document.querySelectorAll('#main-section article .logo')
                        createEl('p', article_logo[i2], 'back-icon');
                        backIcon = document.querySelectorAll('#main-section article .logo .back-icon');
                        backIcon[i2].innerHTML = '<i class="fas fa-arrow-left"></i>';
                        backIcon[i2].addEventListener('click', function (e) {
                            e.preventDefault();
                            for (i = 0; i < param.length; i++) {
                                mainSection.children[i].classList.remove('on');
                            }
                            github.classList.remove('on');
                            subNav.classList.remove('on');
                            coverHeader.classList.remove('on');
                        });
                    }
                    if (template[i2].classList[0] == 'on') {
                        coverHeader.classList.add('on');
                        mainSection.children[i2].classList.add('on');
                    }

                }
            }
            const slide = document.querySelectorAll('#main-section article .myslide');
            myslide({
                target: slide[0],
                type: 'nomal',
                transition: 1000,
                pageScrollHeight: 400,
                control: true,
                // dot: true,
                // dottype: 'img'
            });

            myslide({
                target: slide[1],
                type: 'nomal',
                transition: 1000,
                control: true,
                dot: true,
            });

            myslide({
                target: slide[2],
                transition: 2000,
                control: true,
                dot: true,
                dottype: 'img'
            });

            // myslide({
            //     target: slide[3],
            //     transition: 2000,
            //     control: true,
            //     dot: true,
            //     dottype: 'img'
            // });
        }
    }


    xhttp.open("GET", './js/header.json', true);
    xhttp.send();
})();


