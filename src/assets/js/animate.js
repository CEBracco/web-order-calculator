$(document).ready(function(){
    $('[class*="animated-infinite-"]').each(function () {
        var matchedClass = getMatchClass(this.className, /animated-infinite/);
        var animatedClasses = matchedClass.replace(/infinite-/g,'').split('-');
        var delay = getDelay(animatedClasses[animatedClasses.length - 1]);
        repeatAnimation(this, animatedClasses.join(' '), delay);
        $(this).removeClass(matchedClass).addClass(animatedClasses.join(' '));
    });
})

function getMatchClass(className, match){
    var classes = className.split(' ');
    var matchedClass = null;
    classes.forEach(clazz => {
        if (match.test(clazz)) {
            matchedClass =  clazz;
            return clazz;
        }
    });
    return matchedClass;
}

function repeatAnimation(element, animatedClasses, delay){
    $(element).one('animationend', function () {
        $(element).removeClass(animatedClasses);
        setTimeout(function () {
            $(element).addClass(animatedClasses);
            repeatAnimation(element, animatedClasses, delay)
        }, delay);
    });
}

function getDelay(clazz) {
    return parseInt(clazz.replace(/\D/g, '')) * 1000;
}