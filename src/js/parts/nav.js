jQuery(function ($) {

	cancel the default bootstrap animation / delay
	$('.navbar-collapse').on('show.bs.collapse', function () {
		$(this).addClass("show");
	}).on('hide.bs.collapse', function () {
		$(this).removeClass("show");
	});

    $( window ).scroll( function() {
        $( 'nav.navbar' ).toggleClass( 'affix', $( window ).scrollTop() > 57 );
    });
	
});