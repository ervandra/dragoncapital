/* App Js */
;jQdcc = jQuery.noConflict();
jQdcc(document).ready(function($){
	var w,h,state;
	var stateArray = ['home','about','brains','hearts','eyes','rooftop','career'];
	var dccLobby, dccDeveloper, dccCreative, dccIllustrator, dccRooftop, dccOutspace;

	var title = "Dragon Capital Center";

	var sw;

	function calcY(s){
		var scrollY = 0;
		if(s<=5){
			scrollY = ((h*(6-s))+(50*(5-s))+(2*h))*-1;
		}else{
			scrollY = 0;
		}
		return scrollY;
	}
	function nextPage(){
		if(state<6){
			$('body, .dcc-nav, .top-nav').removeClass(stateArray[state-1]).addClass(stateArray[state]);
			state++;
			$('body').attr('data-state',state);
			updateUrl('/'+stateArray[state]);
			$('.dcc-nav').addClass('disabled');
			if(state==6){
				$('.dcc-container').addClass('launched');
				$('.rocket-holder').addClass('active');
				$('.rocket-holder').css({'transform':'translate3d(0,-'+h*3+'px, 0) scale(0)'});
			}
			$('.dcc-container').css({'transform':'translateY('+calcY(state)+'px)'});
		}
		if(state==5){
			$('.launcher-content').typed({	strings:["Press the launcher button beside <br/> ^1000 and see what's your future can be."], startDelay:1000,	loop:true, backSpeed: 0, backDelay:1000,	typeSpeed: 1, callback: function(e){}});
		}else {
			$('.launcher-content').empty();
		}
		if(state==6){
			setTimeout(function(e){
				$('.dcc-container').removeClass('launched');
				$('.rocket-holder').removeClass('active');
				$('.rocket-holder').css({'transform':'translate3d(0,0, 0) scale(1)'});
				$('.dcc-nav').removeClass('disabled');
			},12000);
		}else{
			setTimeout(function(e){
				$('.dcc-nav').removeClass('disabled');
			},2000);
		}
		checkState();
	}
	function prevPage(){
		if(state>1){
			$('body, .dcc-nav, .top-nav').removeClass(stateArray[state-1]).addClass(stateArray[state]);
			state--;
			$('body').attr('data-state',state);
			updateUrl('/'+stateArray[state]);
			$('.dcc-nav').addClass('disabled');
			$('.dcc-container').css({'transform':'translateY('+calcY(state)+'px)'});
		}
		setTimeout(function(e){
			$('.dcc-nav').removeClass('disabled');
		},2000);
		checkState();
	}
	function gotoPage(page){
		var cState = state;
		if(state!=page){
			updateUrl('/'+stateArray[page]);	
			state=page;
			if(page<7){
				$('body').attr('data-state',state);
				$('.dcc-nav').addClass('disabled');
				$('.dcc-container').css({'transform':'translateY('+calcY(state)+'px)'});
			}
			if(state==5){
				$('.launcher-content').typed({	strings:["Press the launcher button beside <br/> ^1000 and see what's your future can be."], startDelay:1000,	loop:true, backSpeed: 0, backDelay:1000,	typeSpeed: 1, callback: function(e){}});
			}else {
				$('.launcher-content').empty();
			}
			setTimeout(function(e){
				$('.dcc-nav').removeClass('disabled');
			},2000);			
			$('body, .dcc-nav, .top-nav').removeClass(stateArray[cState]).addClass(stateArray[state]);
			checkState();
		}
	}
	function skipPage(page, act,pl){
		$('.dcc-container').addClass('skip-transition');		
		state=page;
		if(page<7){
			$('body').attr('data-state',state);
			$('.dcc-nav').addClass('disabled');
			$('.dcc-container').css({'transform':'translateY('+calcY(state)+'px)'});
		}
		if(state==5){
			$('.launcher-content').typed({	strings:["Press the launcher button beside <br/> ^1000 and see what's your future can be."], startDelay:1000,	loop:true, backSpeed: 0, backDelay:1000,	typeSpeed: 1, callback: function(e){}});
		}else {
			$('.launcher-content').empty();
		}
		initSection(page,pl,act);
		
		setTimeout(function(e){
			$('.dcc-nav').removeClass('disabled');
			$('.dcc-container').removeClass('skip-transition');		
		},3000);			
		$('body, .dcc-nav, .top-nav').removeClass('home').addClass(stateArray[state]);
		checkState();
	}
	function refreshPage(page){
		
		if(page<7){
			$('body').attr('data-state',state);
			$('.dcc-nav').addClass('disabled');
			$('.dcc-container').addClass('skip-transition').css({'transform':'translateY('+calcY(state)+'px)'});
		}			
		setTimeout(function(e){
			$('.dcc-container').removeClass('skip-transition');
			$('.dcc-nav').removeClass('disabled');
		},1000);			
		$('body, .dcc-nav, .top-nav').removeClass(stateArray[state-1]).addClass(stateArray[state]);
		checkState();		
	}
	function resizeRes(){
		var nW = Math.round((2400*h)/1024);
		var nWx = Math.round((4000*h)/1024);
		var nWs = Math.round((2400*h*2)/2048);
		$('.draggable-normal, .draggable-normal .drag-background, .drag-background img').width(nW).height(h);
		$('.draggable-wide, .draggable-wide .drag-background, .drag-background img').width(nWx).height(h);
		$('.dcc-draggable, .dcc-non-drag, .non-drag').height(h);
		$('.sky-separator').css({'height':(h*2)+'px','background-size':nWs+'px '+(h*2)+'px'});
		$('.mascot-bear .mascot').css({'width':Math.round(nWx*0.04375)+'px','height':Math.round(h*0.234375)+'px','background-size':(Math.round(nWx*0.04375)*40)+'px '+Math.round(h*0.234375)+'px'});
		$('.mascot-bebek .mascot').css({'width':Math.round(nWx*0.0325)+'px','height':Math.round(h*0.21484375)+'px','background-size':(Math.round(nWx*0.0325)*25)+'px '+Math.round(h*0.21484375)+'px'});
		$('.mascot-cat .mascot').css({'width':Math.round(nWx*0.05)+'px','height':Math.round(h*0.21484375)+'px','background-size':(Math.round(nWx*0.05)*25)+'px '+Math.round(h*0.21484375)+'px'});
		$('.rocket-holder').css({'width':Math.round(nW*0.085)+'px','height':Math.round(h*.66)+'px', 'margin-left':'-'+Math.round(nW*0.085)/2+'px'});
		$('.smoke-animation').css({'width':Math.round(nWx*0.3)+'px', 'height':Math.round(h*0.29296875)+'px', 'background-size':(Math.round(nWx*0.3)*10)+'px '+Math.round(h*0.29296875)+'px'});
		$('.fire-animation').css({'width':Math.round(nWx*0.025)+'px', 'height':Math.round(h*0.29296875)+'px', 'background-size':(Math.round(nWx*0.025)*10)+'px '+Math.round(h*0.29296875)+'px'});
		$('.rocket-smoke').css({'margin-left':'-'+(Math.round(nWx*0.3)/2)+'px'});
		$('.rocket-fire').css({'margin-left':'-'+(Math.round(nWx*0.025)/2)+'px'});
		$('.reveal-modal .hiring-content, .team-reveal-modal .details, .menu-items, .popup-content').perfectScrollbar('update');

		if(w>1024){
			$('.dcc-planet').css({'margin-top':(h-((w*0.9)/3))/2+'px'});
		}else {
			if(w>768){
				$('.dcc-planet').css({'margin-top':(h-(w*0.8))/2+'px'});
			}else {
				if(w < h){
					$('.dcc-planet').css({'margin-top':(h-(w*0.8))/2+'px'});
				}
			}
			if(h <768 && w < 768){
				$('.dcc-planet .planet-bg img').css({'max-height':h+'px'});
			}
		}
		
		checkOutspace();
	}

	function checkOutspace(){
		if(w <= 1024){
			$('.dcc-space').width(w*3);
			$('.dcc-space .planet').width(w);
		}
	}

	function enableNav(){
		$('body').removeClass('disable-nav');
	}
	function disableNav(){
		$('body').addClass('disable-nav');
	}
	function checkState(){
		$('.dcc-nav .nav').removeClass('disabled');
		if(state<=1){
			$('.dcc-nav .down').addClass('disabled');
		}else if(state>=6){
			$('.dcc-nav .up').addClass('disabled');
		}
	}
	function initMenu(){
		$('.top-nav a').on('click', function(e){
			e.preventDefault();
			var ps = $(this).data('page');
			if(!$('.dcc-nav').hasClass('disabled')){
				gotoPage(ps);
			}		
		})
	}
	function init(){
		w = $(window).width();
		h = $(window).height();
		state = $('body').data('state');

		setTimeout(function(e){$('body').addClass('ready');},3000);

		if(w <= 640){
			$('.dragon-building img').attr('src', $('.dragon-building img').data('mobile'));
		}else if(w <= 1024 && w > 640){
			$('.dragon-building img').attr('src', $('.dragon-building img').data('tablet'));
		} else if(w <= 1440 && w > 1024){
			$('.dragon-building img').attr('src', $('.dragon-building img').data('medium'));
		} else {
			$('.dragon-building img').attr('src', $('.dragon-building img').data('src'));
		}

		$('.logo a').on('click', function(e){
			e.preventDefault();
			if(!$('.dcc-nav').hasClass('disabled') && !$('html').hasClass('touch')){
				gotoPage(1);
			}
		})

		$('.menu-button').on('click', function(e){
			e.preventDefault();
			if(!$('#header').hasClass('disabled')){
				if(!$('.mainmenu').hasClass('active')){
					$('body').addClass('menu-opened');
					$('.menu-button, .mainmenu').addClass('active');
				}else{
					$('body').removeClass('menu-opened');
					$('.menu-button, .mainmenu').removeClass('active');
				}
			}
		});

		$('.menu-items').perfectScrollbar();

		$('.dcc-nav .up').on('click', function(e){
			e.preventDefault();
			if(!$('.dcc-nav').hasClass('disabled') && state<6){
				nextPage();
			}
		})
		$('.dcc-nav .down').on('click', function(e){
			e.preventDefault();
			if(!$('.dcc-nav').hasClass('disabled') && state>1){
				prevPage();
			}		
		})

		$('.btn-watch-us').on('click', function(e){

			e.stopPropagation();
			e.preventDefault();
			$('body').append('<div class="reveal-bg" href="#close"></div><div class="reveal-modal watch-modal" style="top:100px"><div class="flex-video"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/1kwkC-5w4NU" frameborder="0" allowfullscreen></iframe></div><a href="#close" class="close-reveal">Click to close <span></span></a></div>');
			$('.reveal-modal .hiring-content').perfectScrollbar();
			$('.reveal-bg, .reveal-modal').addClass('active');
			disableNav(); 

			$('body').find('.reveal-modal a.close-reveal, .reveal-bg').on('click', function(e){
				e.stopPropagation();
				e.preventDefault();
				$('.reveal-bg, .reveal-modal').removeClass('active');
				setTimeout(function(e){
					$('body').find('.reveal-bg').remove();
					$('body').find('.reveal-modal').remove();
				},400);			
				enableNav();
			})
		});


		resizeRes();
		checkState();

		start();
		initMenu();
		initEsc();

		$('.dragon > a').each(function(i,e){
			$(e).css({'animation':'planetarium 4000ms '+Math.floor((Math.random() * 500) + 200)+'ms'+' infinite cubic-bezier(0.455, 0.03, 0.515, 0.955)'});
		});

		$(window).on('resize', function(e){
			h = $(window).height();
			w = $(window).width();
			$('body').hide();
			resizeRes();
			refreshPage(state);

			$('body').get(0).offsetHeight; 
			$('body').show();
		});

		sw = $('body').data('page');
		var d = 500;

		if(sw != '-1') {
			$('#dcc-intro').remove();
			if(sw==0){
				skipPage(1,1);
			}else if(sw==1){
				skipPage(2,1);
			}else if(sw==2){
				skipPage(3,1);
			}else if(sw==3){
				skipPage(4,1);
			}else if(sw==4){
				skipPage(5,1);
			}else if(sw==5){
				skipPage(6,1);
			}else if(sw>5 && sw <20){
				skipPage(2,2);
			}else if(sw>19 && sw <39){
				skipPage(3,2);
			}
			else if(sw>38 && sw <53){
				skipPage(4,2);
			}
			else if(sw>52){
				if(sw>52 && sw<62){
					skipPage(6,2,0);
				}else if(sw>61 && sw<67){
					skipPage(6,2,1);
				}else {
					skipPage(6,2,2);
				}
			}
		}else if(sw == '-1'){
			initImagesLoaded(d,sw);
		}		
	}

	function start(){
		$('.start-now').on('click', function(e){
			e.preventDefault();
			state=1;
			updateUrl($(this).attr('href'));
			var initScroll = ((h*(6-state))+(50*(5-state))+(2*h))*-1;
			$('.dcc-container').css({'transform':'translateY('+initScroll+'px)'});
			var $scrolled = ($('#dcc-home').height()-$(window).height());
			$('#header').show();
			var timeout = 4000;
			if(w < 769){
				timeout = 1000;
			}
			setTimeout(function(e){
				$('#dcc-home').css({'transformOrigin':'50% 100% 0', 'transform':'translateY(-'+$scrolled+'px)', 'transition-duration':timeout+'ms'});
				setTimeout(function(e){
					$('#dcc-home').css({'transform':'translateY(-'+$scrolled+'px) scale(2)', 'opacity':'0', 'transition':'transform 1.5s cubic-bezier(0.465, 0.183, 0.153, 0.946), opacity 2s cubic-bezier(0.465, 0.183, 0.153, 0.946) 1.5s'});
					initLobby();
					setTimeout(function(e){
						$('body').attr('data-state', state);
						$('.dcc-nav, body, .top-nav').removeClass(stateArray[state-1]).addClass(stateArray[state]);
						$('#dcc-intro').remove();
					},3000);
				},timeout);
			},100);
		});
}

function initLobby(){
	$('#dcc-lobby').css({'background-image':'url('+$('#dcc-lobby').data('src')+')'});
	checkImagesDone($('#dcc-lobby'), $('.top-nav li.f1 a span.enabled'), $('#preload-lobby'));	
	$('.btn-meet-us').on('click', function(e){
		e.preventDefault();
		if(!$('.dcc-nav').hasClass('disabled') && state==1){
			gotoPage(2);
		}		
	});
	$('.skip-typed-button').on('click', function(e){
		e.preventDefault();
		$(this).hide();
		$('.normal-typed').hide();
		$('.skip-typed').show();
		$('.lobby-button-container').addClass('active');
	});
	setTimeout(function(e){
		$('.paragraph').typed({	strings:["Hi, ^500 we just came back to mother earth to spread what we have seen back in the future. ^700 What we are doing might not be something you have seen before. ^700 <br/>We know what you have thought.<br/> ^1000 No, ^200 not that one, ^1000 and not that one either. ^900 <br/>Curious?"], startDelay:500,	loop:false,	typeSpeed: 2, callback: function(e){$('.skip-typed-button').hide();$('.lobby-button-container').addClass('active');}});
	},3000);
	
}
function initDev(a){
	injectSrc($('#dcc-developer .drag-background img'));
	checkImagesDone($('#dcc-developer'), $('.top-nav li.f2 a span.enabled'), $('#preload-developer'));
	dccDeveloper = new IScroll('#dcc-developer', { scrollX: true, scrollY: false, mouseWheel: true, mouseWheelSpeed:10, deceleration:0.01, scrollbars: true, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|P)$/ }});
	var interval;
	var iv = 50;
	$('.drag-nav-developer .draggie.drag-next').on('mousedown touchstart', function(e){
		e.preventDefault();
		var elW = $('#dcc-developer .draggables').width();
		interval = setInterval(function(e){
			if((elW - w) > dccDeveloper.x*-1){
				dccDeveloper.scrollBy(-1*iv,0);
			}
			iv++;
		},10);
	});
	$('.drag-nav-developer .draggie.drag-next').on('mouseup mouseout touchend', function(e){
		e.preventDefault();
		clearInterval(interval);
		iv=1;
	});
	$('.drag-nav-developer .draggie.drag-prev').on('mousedown touchstart', function(e){
		e.preventDefault();
		var elW = $('#dcc-developer .draggables').width();
		interval = setInterval(function(e){
			if(dccDeveloper.x < 0){
				dccDeveloper.scrollBy(iv,0);
			}
			iv++;
		},10);
	});
	$('.drag-nav-developer .draggie.drag-prev').on('mouseup mouseout touchend', function(e){
		e.preventDefault();
		clearInterval(interval);
		iv=1;
	});
}
function initCreative(a){
	injectSrc($('#dcc-creative .drag-background img'));
	checkImagesDone($('#dcc-creative'), $('.top-nav li.f3 a span.enabled'), $('#preload-creative'));
	dccCreative = new IScroll('#dcc-creative', { scrollX: true, scrollY: false, mouseWheel: true, mouseWheelSpeed:10, deceleration:0.01, scrollbars: true, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|P)$/ }});
	var interval;
	var iv = 50;
	$('.drag-nav-creative .draggie.drag-next').on('mousedown touchstart', function(e){
		e.preventDefault();
		var elW = $('#dcc-creative .draggables').width();
		interval = setInterval(function(e){
			if((elW - w) > dccCreative.x*-1){
				dccCreative.scrollBy(-1*iv,0);
			}
			iv++;
		},10);
	});
	$('.drag-nav-creative .draggie.drag-next').on('mouseup mouseout touchend', function(e){
		e.preventDefault();
		clearInterval(interval);
		iv=1;
	});
	$('.drag-nav-creative .draggie.drag-prev').on('mousedown touchstart', function(e){
		e.preventDefault();
		var elW = $('#dcc-creative .draggables').width();
		interval = setInterval(function(e){
			if(dccCreative.x < 0){
				dccCreative.scrollBy(iv,0);
			}
			iv++;
		},10);
	});
	$('.drag-nav-creative .draggie.drag-prev').on('mouseup mouseout touchend', function(e){
		e.preventDefault();
		clearInterval(interval);
		iv=1;
	});
}
function initIllustrator(a){
	injectSrc($('#dcc-illustrator .drag-background img'));
	checkImagesDone($('#dcc-illustrator'), $('.top-nav li.f4 a span.enabled'), $('#preload-illustrator'));
	dccIllustrator = new IScroll('#dcc-illustrator', { scrollX: true, scrollY: false, mouseWheel: true, mouseWheelSpeed:10, deceleration:0.01, scrollbars: true, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|P)$/ }});
	var interval;
	var iv = 50;
	$('.drag-nav-illustrator .draggie.drag-next').on('mousedown touchstart', function(e){
		e.preventDefault();
		var elW = $('#dcc-illustrator .draggables').width();
		interval = setInterval(function(e){
			if((elW - w) > dccIllustrator.x*-1){
				dccIllustrator.scrollBy(-1*iv,0);
			}
			iv++;
		},10);
	});
	$('.drag-nav-illustrator .draggie.drag-next').on('mouseup mouseout touchend', function(e){
		e.preventDefault();
		clearInterval(interval);
		iv=1;
	});
	$('.drag-nav-illustrator .draggie.drag-prev').on('mousedown touchstart', function(e){
		e.preventDefault();
		var elW = $('#dcc-illustrator .draggables').width();
		interval = setInterval(function(e){
			if(dccIllustrator.x < 0){
				dccIllustrator.scrollBy(iv,0);
			}
			iv++;
		},10);
	});
	$('.drag-nav-illustrator .draggie.drag-prev').on('mouseup mouseout touchend', function(e){
		e.preventDefault();
		clearInterval(interval);
		iv=1;
	});
}
function initRooftop(){
	$('#dcc-rooftop').css({'background-image':'url('+$('#dcc-rooftop').data('src')+')'});
	checkImagesDone($('#dcc-rooftop'), $('.top-nav li.f5 a span.enabled'), $('#preload-rooftop'));
	$('.btn-launch').on('click', function(e){
		e.preventDefault();
		if(!$('.dcc-nav').hasClass('disabled') && state<6){
			nextPage();
		}
	});
}
function initOutspace(p,a){
	$('#dcc-outspace').css({'background-image':'url('+$('#dcc-outspace').data('src')+')'});
	checkImagesDone($('#dcc-outspace'), $('.top-nav li.f6 a span.enabled'), $('#preload-outspace'));	
	initParallax();
	var c = 0;
	if(p!=null){
		c = p;
	}
	$("#dcc-space").slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		appendArrows:'#slick-nav-container',
		prevArrow:'<a href="#prev-planet" class="prev-planet slick-nav"><span class="fa fa-angle-left"></span></a>',
		nextArrow:'<a href="#next-planet" class="next-planet slick-nav"><span class="fa fa-angle-right"></span></a>',
		responsive: [{
			breakpoint: 1025,
			settings: {
				slidesToShow: 1,
				initialSlide: c,
			}
		}]
	});
}

function initParallax(){
	$('#planet-scene').parallax({scalarX:3});
}

function checkImagesLoaded(){
	initDev();
	initCreative();
	initIllustrator();
	initRooftop();
	initOutspace();
	initPopup();
	initReveal();
}
function initImagesLoaded(delay,sw){
	var d = 500;
	if(delay) d =delay;
	var valProgress = 0;
	$('#dcc-intro, #header, #dcc-lobby').imagesLoaded().progress(function(e){
		var imgLen = e.images.length;
		valProgress++;
		setProgress(valProgress,imgLen);
	}).always(function(e){
		setTimeout(function(e){
			if(sw=='-1') {
				$('.dcc-preloader').fadeOut(300);
			}
			checkImagesLoaded();
			$('.predcc-zeppelin').addClass("dcc-zeppelin").fadeIn(1000);
		}, delay)
		
	});
}
function setProgress(valProgress,imgLen){
	var val = (valProgress / imgLen) * 100;
	var height = (valProgress / imgLen) * 70;
	$('.dp-progressfront').css('height',height+'px');
	$('.dp-progressval').html(val.toFixed(0)+'%');
} 

function initPopup(){
	$('.dragon a').on('click', function(e){
		e.stopPropagation();
		e.preventDefault();		
		disableNav();
		if(!$(this).parent().hasClass('active')){
			var minX = 0;
			if($(this).siblings('.popup-content').hasClass('open-top-left') || $(this).siblings('.popup-content').hasClass('open-bottom-left')){
				minX = -580;
			}else if($(this).siblings('.popup-content').hasClass('open-top-right') || $(this).siblings('.popup-content').hasClass('open-bottom-right')){
				minX = -120;
			}else {
				minX = true;
			}
			if(w<=640){
				minX = true;
			}
			if($(this).parent().parent().hasClass('team-developer')){
				var dg = $(this).attr('href').substring(1);
				dccDeveloper.scrollToElement(document.querySelector('.dragon-'+dg),1500, minX,true, IScroll.utils.ease.circular);				
			}else if($(this).parent().parent().hasClass('team-creative')){
				var dg = $(this).attr('href').substring(1);
				dccCreative.scrollToElement(document.querySelector('.dragon-'+dg),1500, minX,true, IScroll.utils.ease.circular);				
			}else if($(this).parent().parent().hasClass('team-illustrator')){
				var dg = $(this).attr('href').substring(1);
				dccIllustrator.scrollToElement(document.querySelector('.dragon-'+dg),1500, minX,true, IScroll.utils.ease.circular);				
			}
			$(this).parent().addClass('active');
			updateUrl($(this).attr('href'));
			if(w<=667){
				$('body').append('<div class="team-reveal-bg"></div><div class="team-reveal-modal">'+$(this).parent().find('.popup-content').html()+'<a href="#" class="close-reveal">Click to close <span></span></a></div>');			
				$('.team-reveal-modal .details').perfectScrollbar();
				$('.team-reveal-bg, .team-reveal-modal').addClass('active');
			}
		}else {
			$('.team-reveal-bg, .team-reveal-modal').removeClass('active');
			$('.dragon').removeClass('active');
			enableNav();			
		}
		$('body').find('.team-reveal-modal a.close-reveal, .team-reveal-bg').on('click', function(e){
			e.preventDefault();
			$('.team-reveal-bg, .team-reveal-modal').removeClass('active');
			setTimeout(function(e){
				$('body').find('.team-reveal-bg').remove();
				$('body').find('.team-reveal-modal').remove();
			},400);
			$('.dragon').removeClass('active');
			enableNav();
		});
	})

$('.dragon-bg').on('click', function(e){
	e.preventDefault();		
	$('.dragon').removeClass('active');
	$('.team-reveal-bg, .team-reveal-modal').removeClass('active');
	setTimeout(function(e){
		$('body').find('.team-reveal-bg').remove();
		$('body').find('.team-reveal-modal').remove();
	},400);
	enableNav();
})


}
function initReveal(){
	$('.dragon-hiring > a').on('click', function(e){
		e.stopPropagation();
		e.preventDefault();
		var $this_id = $(this).data('dragon-id');
		updateUrl($(this).attr('href'));
		$('body').append('<div class="reveal-bg" href="#close"></div><div wanted-id="'+$this_id+'" class="reveal-modal" style="top:100px">'+$(this).parent().find('.reveal').html()+'<a href="#close" class="close-reveal">Click to close <span></span></a></div>');
		$('.reveal-modal .hiring-content').perfectScrollbar();
		$('.reveal-bg, .reveal-modal').addClass('active');
		disableNav(); 

		$('body').find('.reveal-modal a.close-reveal, .reveal-bg').on('click', function(e){
			e.stopPropagation();
			e.preventDefault();
			$('.reveal-bg, .reveal-modal').removeClass('active');
			setTimeout(function(e){
				$('body').find('.reveal-bg').remove();
				$('body').find('.reveal-modal').remove();
			},400);			
			enableNav();
		})
	});
}

function injectSrc(el){
	if(h <= 400 && w < 1024){
		el.attr('src', el.data('mobile'));
	}else if(h <= 600 && h > 400 && w < 1024){
		el.attr('src', el.data('tablet'));
	}else if(h <= 800 && h > 600){
		el.attr('src', el.data('medium'));
	}else {
		el.attr('src', el.data('src'));
	}
}
function capitalize(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function updateUrl(url){
	if($('html').hasClass('history')){
		var queryParameters = {}, queryString = location.pathname.split('/');
		title = capitalize(url.replace('-', ' ').replace('/',''))+' | Dragon Capital Center';
		url = '/'+url;
		history.pushState('', '', url);
		
		document.title = title;
	}
}

function initSection(n,p,a){
	if(n==1){
		initLobby();
		var valProgress = 0;
		$('#dcc-lobby').imagesLoaded().progress(function(e){
			var imgLen = e.images.length;
			valProgress++;
			setProgress(valProgress,imgLen);
		}).always(function(e){
			$('.dcc-preloader').fadeOut(300);
			$('body').addClass('imgloaded');
			$('#header').show();
			initDev();initCreative();initIllustrator();initRooftop();initOutspace();
		});
	}else if(n==2){
		initDev(a);
		var valProgress = 0;
		$('#dcc-developer').imagesLoaded().progress(function(e){
			var imgLen = e.images.length;
			valProgress++;
			setProgress(valProgress,imgLen);
		}).always(function(e){
			$('.dcc-preloader').fadeOut(300);
			$('body').addClass('imgloaded');
			$('#header').show();
			initLobby();initCreative();initIllustrator();initRooftop();initOutspace();
		});
	}else if(n==3){
		initCreative(a);
		var valProgress = 0;
		$('#dcc-creative').imagesLoaded().progress(function(e){
			var imgLen = e.images.length;
			valProgress++;
			setProgress(valProgress,imgLen);
		}).always(function(e){
			$('.dcc-preloader').fadeOut(300);
			$('body').addClass('imgloaded');
			$('#header').show();
			initLobby();initDev();initIllustrator();initRooftop();initOutspace();
		});
	}else if(n==4){
		initIllustrator(a);
		var valProgress = 0;
		$('#dcc-illustrator').imagesLoaded().progress(function(e){
			var imgLen = e.images.length;
			valProgress++;
			setProgress(valProgress,imgLen);
		}).always(function(e){
			$('.dcc-preloader').fadeOut(300);
			$('body').addClass('imgloaded');
			$('#header').show();
			initLobby();initCreative();initDev();initRooftop();initOutspace();
		});
	}else if(n==5){
		initRooftop();
		var valProgress = 0;
		$('#dcc-rooftop').imagesLoaded().progress(function(e){
			var imgLen = e.images.length;
			valProgress++;
			setProgress(valProgress,imgLen);
		}).always(function(e){
			$('.dcc-preloader').fadeOut(300);
			$('body').addClass('imgloaded');
			$('#header').show();
			initLobby();initCreative();initIllustrator();initDev();initOutspace();
		});
	}else if(n==6){
		initOutspace(p,a);
		var valProgress = 0;
		$('#dcc-outspace').imagesLoaded().progress(function(e){
			var imgLen = e.images.length;
			valProgress++; 
			setProgress(valProgress,imgLen);
		}).always(function(e){
			$('.dcc-preloader').fadeOut(300);
			$('body').addClass('imgloaded');
			$('#header').show();
			initLobby();initCreative();initIllustrator();initRooftop();initDev();
		});
	}	
	initPopup();
	initReveal();
	if(a==2){
		if(n==6){
			var dg = $('body').data('page-state');
			interval2 = setInterval(function(e){
				if($('body').hasClass('imgloaded')){
					clearInterval(interval2);
					$('.dragon-'+dg+' > a').click();
				}
			},100);
		}else {
			var dg = $('body').data('page-state');
			interval2 = setInterval(function(e){
				if($('body').hasClass('imgloaded')){
					$('.dragon-'+dg).find('.dragon-btn').trigger('click');
					clearInterval(interval2);
				}
			},100);
		}
	}
}

function checkImagesDone(e,p,l){
	var valProgress = 0;
	e.imagesLoaded().progress(function(z){
		valProgress++;
		var curProgress = (valProgress / z.images.length) * 100;
		p.css('width',curProgress+'%');
		l.find('span').html(curProgress+'%');
	}).always(function(c){
		p.css('width','100%');
		l.fadeOut(250);
	});
}

function initEsc(){
	$(document).keydown(function(e) {
		if (e.keyCode == 27) {
			if($('body').hasClass('disable-nav')){
				e.preventDefault();
				$('.dragon').removeClass('active');
				$('body').find('.reveal-bg, .team-reveal-bg').remove();
				$('body').find('.reveal-modal, .team-reveal-modal').remove();
				enableNav();
			}
		}
	});
}
init();
});