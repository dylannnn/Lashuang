(function ( $ ) {
 	'use strict';
	//START Script
	$("[data-toggle='tooltip']").tooltip();

	$('.conjugaisonList a').each(function () {
		$(this).click(function () {
			if ($(this).attr('aria-expanded') == "false") {
				$(this).children('span.icon').addClass('fa-minus');
			} else {
				$(this).children('span.icon').removeClass('fa-minus');
			}
		});
	});

	//END Script
}( jQuery ));