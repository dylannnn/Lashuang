(function ($, root, undefined) {
	$(function () {
		'use strict';
		//START Script
		$("form.searchInput div.upload").click(function () {
			$("form.searchInput input.uploadBtn").click();
		});

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
	});
})(jQuery, this);