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

var scene = document.getElementById('scene4');
var parallax = new Parallax(scene);

/* var scene = document.getElementById('scene3');
var parallax = new Parallax(scene); */
