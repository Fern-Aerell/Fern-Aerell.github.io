$(function() {
    $(window).scroll(function() {
        const scrollY = $(this).scrollTop();

        const translateX01 = -5;
        const translateY01 = -35 + scrollY / 10;
        $(".header-emoji-01").css('transform', `translateX(${translateX01}vw) translateY(${translateY01}vh)`);

        const rotate02 = 21.517;
        const translateX02 = 35 + scrollY / 50;
        const translateY02 = -55 + scrollY / 10;
        $(".header-emoji-02").css('transform', `rotate(${rotate02}deg) translateX(${translateX02}vw) translateY(${translateY02}vh)`);

        const rotate03 = -11.521;
        const translateY03 = 44 + scrollY / 10;
        $(".header-emoji-03").css('transform', `rotate(${rotate03}deg) translateX(15vw) translateY(${translateY03}vh)`);

        const translateX04 = 66;
        const translateY04 = 23 + scrollY / 10;
        $(".header-emoji-04").css('transform', `translateX(${translateX04}vw) translateY(${translateY04}vh)`);
    });
});
