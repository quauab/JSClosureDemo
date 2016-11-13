$(document).ready(function(){
	elements().navtop.innerHTML = document.title.substring(0,1).toUpperCase() + document.title.substring(1,(document.title.length));
	interval = doInterval(dateTime,1);

	$('.delete-user').on('click',function(){
		var id = $(this).data('id');
		var url = '/delete/'+id;
		if (confirm('Delete User?')) {
			$.ajax({
				url: url,
				type: 'DELETE',
				success:function(result){
					console.log('Deleting User ...');
					window.location.href='/';
				},
				error:function(err) {
					console.log(err);
				}
			});
		}
	});

	$('.edit-user').on('click', function(){
		$('#edit-form-id').val($(this).data('id'));
		$('#edit-form-name').val($(this).data('name'));
		$('#edit-form-username').val($(this).data('username'));
		$('#edit-form-first_name').val($(this).data('first_name'));
		$('#edit-form-last_name').val($(this).data('last_name'));
		$('#edit-form-middle_name').val($(this).data('middle_name'));
		$('#edit-form-email').val($(this).data('email'));
		$('#edit-form-emails').val($(this).data('emails'));
		$('#edit-form-phone').val($(this).data('phone'));
		$('#edit-form-phones').val($(this).data('phones'));
	});
});

function dateTime() {
	elements().navbottom.innerHTML = stamp();
}

function elements() {
	return {
		navtop:element('navbarheadertop'),
		navbottom:element('navbarheaderbottom')
	};
}
