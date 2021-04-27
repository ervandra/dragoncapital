

$(window).load(function() 
{
	$('.preloader').fadeOut(900); 
});

// intro page 
$(document).ready (function() {
	function loop() {
	$('.introTrigger').animate ({top: '70px', opacity:'1'},900);
	$('.introTrigger').animate ({top: '50px', opacity:'.5'},900,loop);

	}
	loop();
});

$(document).ready (function() {
	function loop() {
	$('.sliderArrow').animate ({top: '76%', opacity:'1'},100);
	$('.sliderArrow').animate ({top: '83%', opacity:'0'},900);
	$('.sliderArrow').animate ({top: '76%', opacity:'0'},loop);

	}
	loop();
});

// intro trigger 
$(document).ready (function() {
	$('.introTrigger,.introLogo').click(function() {
		$('.introContent').animate({top:'-100%'},1300,'easeInBack');
		$('.introSection').slideUp(1500,'easeInBack');
		$('body').css('overflow-y','scroll');
		/* $('.headerSection').delay(1000).slideDown(); */
		
	});
});

//(function($){
//			$(window).load(function(){
	//			$(".carDesc").mCustomScrollbar({theme:"rounded-dots-dark"});
		//	});
		//})(jQuery);


// carousel
$(document).ready(function() {
      $("#owl-demo").owlCarousel({

      navigation : true,
      slideSpeed : 900,
      paginationSpeed : 1000,
	  scrollPerPage: true,
      singleItem : true,
	  autoPlay : true
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
      });
    });
	
// carosel anime
$(document).ready(function(){
     var index  = ''
    $('.team').hover(function() {
        index = $(this).data('index');
		$(".profile-"+index).stop().animate({top:'490px'});
		$(".cloudProfile-"+index).stop().animate({top:'360px',opacity: '1'});
	},
	function ()	{
	    $(".profile-"+index).stop().animate({top:'600px'});
		$(".cloudProfile-"+index).stop().animate({top:'390px',opacity:'0'});
	}
	);
});

$(document).ready(function() {
	$(".profile2").hover(function() {
		$(".profile-2").stop().addClass("profile-2Pic2").animate({opacity: '1', top:'450px'});
		$(".profile2").stop().addClass("profile2-2");
		$(".cloudProfile-2").stop().css({visibility: "visible"});
		$(".cloudProfile-2").stop().delay(100).animate({opacity: '1', top:'320px'});
		$(".cloudCoin").stop().delay(100).animate({opacity: '1', top:'260px'},700);
		$(".cloudCoin").stop().animate({opacity: '0'});
	},
	function ()	{
		$(".profile-2").stop().removeClass("profile-2Pic2").animate({opacity: '1', top:'600px'});
		$(".profile2").stop().removeClass("profile2-2");
		$(".profile2-2").stop().animate({opacity: "0"});
		$(".cloudProfile-2").stop().css({visibility: "hidden"});
		$(".cloudProfile-2").stop().delay(100).animate({opacity: '1', top:'430px'});
		$(".cloudCoin").stop().animate({opacity: '0', top:'400px'});
		});
});

// team profile

var scene = document.getElementById('scene');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene2');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene3');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene4');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene5');
var parallax = new Parallax(scene);

// job vacancy
// Carousel

$(document).ready(function() {
		Slider = $('#slider2').Swipe({
			continuous: true,
			speed: 1000
		}).data('Swipe');
		$('.prev').on('click', Slider.next);
		$('.next').on('click', Slider.prev);

	});

	$(document).ready(function() {
		Slider = $('#slider').Swipe({
			continuous: true,
			speed: 1000
		}).data('Swipe');

		$('.next').on('click', Slider.next);
		$('.prev').on('click', Slider.prev);
});
