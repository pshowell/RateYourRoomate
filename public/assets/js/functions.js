$(document).ready(function () {

    //filter form validation
    $('#rlocation').change(function () {
        if ($(this).val() !== 'Roommate Rlocation') {
            $('#submit').removeAttr('disabled').removeClass('disabled');
        } else {
            $('#submit').attr('disabled', true).addClass('disabled');
        }
    });

    $('.section-change').click(function () {
        var hideId = $('.section-change.active').attr('data-section');
        var showId = $(this).attr('data-section');
        $('.section-change.active').removeClass('active');
        $(this).addClass('active');
        $(hideId).addClass('d-none');
        $(showId).removeClass('d-none');
    });

    function getUsersRoommates(userId) {
        $.get('/api/users-roommates/' + userId).done(function (data) {
            console.log(data);
            for (roommate in data) {
                var friendRoommateId = $('#FriendRoommateId').val();

                if (friendRoommateId != data[roommate].id) {
                    var $col = $('<div>', {
                        class: 'col-md-6'
                    });
                    var $form = $('<form>', {
                        class: 'add-friend',
                        method: 'post'
                    });
                    var $card = $('<div>', {
                        class: 'card float-right'
                    });
                    var $cardImage = $('<img>', {
                        src: data[roommate].rmpicture,
                        class: 'card-img-top',
                        alt: data[roommate].rmname
                    });
                    var $cardBody = $('<div>', {
                        class: 'card-body'
                    });
                    var $cardTitle = $('<h4>', {
                        class: 'card-title'
                    });
                    var $friendRoommateId = $('<input>', {
                        type: 'hidden',
                        name: 'friendRoommateId',
                        class: 'friendRoommateId',
                        value: $('#FriendRoommatetId').val()
                    });
                    var $myRoomateId = $('<input>', {
                        type: 'hidden',
                        name: 'myRoommateId',
                        class: 'myRoommateId',
                        value: data[roommate].id
                    });

                    var $makeFriendship = $('<input>', {
                        type: 'submit',
                        value: 'Add Friend',
                        class: 'MatchFriend'
                    });

                    $form.append($card);
                    $card.append($cardImage);
                    $card.append($cardBody);
                    $cardBody.append($cardTitle);
                    $cardTitle.html(data[roommate].rmname);
                    $cardBody.append($friendRoommateId);
                    $cardBody.append($myRoommateId);
                    $cardBody.append($makeFriendship);

                    $col.append($form);

                    $('#AsyncFriends').append($col);
                }
            }
            $('.add-friend').each(function () {
                var friendRoommateId = $(this).find('.friendRoommateId').val();
                var myRoommateId = $(this).find('.myRoommateId').val();
                console.log('friendRoommateId', friendRoommateId);
                console.log('myRoommateId', myRoommateId);
                $(this).find('.MatchFriend').on('click', function (event) {
                    event.preventDefault();
                    $.post('/api/friendships', {
                            myRoommateId: myRoommateId,
                            friendRoommateId: friendRoommateId
                        })
                        .done(function (response) {
                            $('#AsyncFriends').html(response);
                        });
                });
            });

        });
    }

    $('#SubmitFriend').on('click', function (event) {
        event.preventDefault();
        var userId = $('#AddFriendForm').attr('data-userId');
        $('#AsyncFriends').html('');
        getUsersRoommates(userId);
    });

    $('#SubmitPost').on('click', function (event) {
        event.preventDefault();
        var userId = $('#UserId').val();
        var postBody = $('#PostBody').val();

        $.post('/api/posts', {
            UserId: userId,
            body: postBody
        }).done(function (response) {
            var $card = $('<div>', {
                class: 'card mb-3 w-100'
            });
            var $cardBody = $('<div>', {
                class: 'card-body text-secondary'
            });
            var $cardText = $('<p>', {
                class: 'card-text'
            });
            var $cardFooter = $('<div>', {
                class: 'card-footer bg-transparent'
            });


            $card.append($cardBody);
            $cardBody.append($cardText);
            $card.append($cardFooter);

            $cardText.html(postBody);
            $cardFooter.html('<small>just now</small>');

            $('#Posts').prepend($card);
            $('#PostBody').val('');
        });

    });
// delete function
    $('#DeletePost').on('click', function (event) {
        // event.preventDefault();
        // event.stopPropagation();
        var id = $(this).attr('data-id');

        var deletePost = confirm('Are you sure you want to delete your post?');

        if (deletePost) {
            $.ajax({
                method: 'DELETE',
                url: '/api/delete-post/' + id
            }).done(function (response) {
                location.reload();
            });
        }
    });
    // $('#UpdatePost').on('click', function (event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     var id = $(this).attr('data-id');
    //     //
    //     var deletePost = confirm('Are you sure you want to delete your post?');
    //
    //     if (updatePost) {
    //         $.ajax({
    //             method: 'UPDATE',
    //             url: '/api/update-post/' + id
    //         }).done(function (response) {
    //             location.reload();
    //         });
    //     }
    // });


// end espie's edit

    $('.delete-roommate').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var id = $(this).attr('data-id');

        var deleteRoommate = confirm('Are you sure you want to delete your roommate?');

        if (deleteRoommate) {
            $.ajax({
                method: 'DELETE',
                url: '/api/delete-roommate/' + id
            }).done(function (response) {
                location.reload();
            });
        }
    });

    function getRoommateInfo(roommateId) {
        $.get('/api/roommate/' + roommateId).done(function (data) {
            $(".roommate-data").remove();
            $('#edit-roommate-form').append('<input type="hidden" class="roommate-data" name="id" value="' + data.id + '" />');
            $('#UpdateRoommateImg-form').append('<input type="hidden" class="roommate-data" name="id" value="' + data.id + '" />');
            $('#UpdateRoommateImg-form').append('<input type="hidden" class="roommate-data" name="name" value="' + data.rmname + '" />');
            $('#roommate-rmname').val(data.rmname);
            $('#roommate-rmpicture').val(data.rmpicture);
            $('#roommate-rlocation').val(data.rlocation);
            $('#roommate-withRoom').val(data.withRoom);
            $('#roommate-rmage').val(data.rmage);
            $('#roommate-rmbio').val(data.rmbio);

        });
    }

    $('.edit-roommate').on('click', function () {
        var roommateId = $(this).attr('data-id');
        getRoommateInfo(roommateId);
    });

    $('#cancel-edit').on('click', function () {
        location.reload();
    });

    switch (window.location.pathname) {

        case '/profile':
        case '/profile/':
            $('#view-post').addClass('active');
            $('#my-profile').addClass('active outline-active');
            break;
        case '/profile/view-roommates':
        case '/profile/view-roommates/':
            $('#view-roommates').addClass('active');
            $('#my-profile').addClass('active outline-active');
            break;
        case '/profile/view-friends':
        case '/profile/view-friends/':
            $('#view-friends').addClass('active');
            break;
        case '/profile/edit-profile':
        case '/profile/edit-profile/':
            $('#edit-profile').addClass('active');
            $('#my-profile').addClass('active outline-active');
            break;
        case '/home':
        case '/home/':
            $('#feed').addClass('active');
            break;
        case '/roommates':
        case '/roommates/':
            $('#find-roommates').addClass('active outline-active');
            break;
        case '/users':
        case '/users/':
            $('#find-users').addClass('active outline-active');
            break;
    }
    $('.modal').on('shown.bs.modal', function() {
      $(this).find('[autofocus]').focus();
    });

// star rating (espie)
var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
  return $star_rating.each(function() {
    if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
      return $(this).removeClass('fa-star-o').addClass('fa-star');
    } else {
      return $(this).removeClass('fa-star').addClass('fa-star-o');
    }
  });
};

$star_rating.on('click', function() {
  $star_rating.siblings('input.rating-value').val($(this).data('rating'));
  return SetRatingStar();
});

SetRatingStar();
$(document).ready(function() {

});

});
