const about = document.querySelector('#about');
const work = document.querySelector('#work');
const contact = document.querySelector('#contact');

const url = document.URL;

let param = url.split('/')[3];

if( about && param == 'about') {
    // Then give this active class and remove active from other dom objs
    about.classList.toggle('active');
    work.classList.remove('active');
    contact.classList.remove('active');
}
else if( contact && param == 'contact') {
    // Then give this active class and remove from others
    contact.classList.toggle('active');
    work.classList.remove('active');
    about.classList.remove('active');
}

else if(param == 'work' || param == '') {
    // Then give this active class and remove from others
    work.classList.toggle('active');
    about.classList.remove('active');
    contact.classList.remove('active');
}

