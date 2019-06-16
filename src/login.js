window.onload = function(evt) {
    $('#loginForm')
        .delay(0)
        .fadeIn(200);
    if (evt.persisted) {
        document.body.style.display = 'none';
        location.reload();
    }
};

$(function() {
    $('#show_register_btn').click(function(e) {
        $('#loginForm').fadeOut(200);
        $('#registerForm')
            .delay(200)
            .fadeIn(200);
        e.preventDefault();
        //window.location.replace('/register')
    });

    $('#loginForm').submit(function(e) {
        e.preventDefault();
        if (
            document.forms['loginForm'].inputPassword.value === '' ||
            document.forms['loginForm'].inputUsername.value === ''
        ) {
            alert('username or password field is empty');
            return;
        }

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $('#loginForm').serialize(),
            dataType: 'application/json',
            complete: function(res) {
                if (res.status === 200) {
                    window.location.assign('/');
                } else {
                    $('#inputUsername').addClass('is-invalid');
                    $('#inputPassword').addClass('is-invalid');
                }
            }
        });
    });

    $('#show_login_btn').click(function(e) {
        $('#registerForm').fadeOut(200);
        $('#loginForm')
            .delay(200)
            .fadeIn(200);
        e.preventDefault();
    });

    $('#registerForm').submit(function(e) {
        e.preventDefault();
        if (document.forms['registerForm'].bettingNames.value === 'Select your betting name') {
            // $("#bettingNames").addClass('is-invalid')
            alert('Pick your name from the list');
            return;
        }
        if (
            document.forms['registerForm'].inputPassword.value !== document.forms['registerForm'].inputPassword2.value
        ) {
            $('#inputPasswordRegister').addClass('is-invalid');
            $('#inputPassword2Register').addClass('is-invalid');
            return;
        }

        $.ajax({
            url: '/api/register',
            method: 'POST',
            data: $('#registerForm').serialize(),
            dataType: 'application/json',
            complete: function(res) {
                if (res.status === 200) {
                    window.location.assign('/login');
                } else if (res.status === 400) {
                    alert(
                        `Someone has already registered with the name ${
                            document.forms['registerForm'].bettingNames.value
                        }`
                    );
                } else if (res.status === 401) {
                    alert(
                        `The login name: ${document.forms['registerForm'].inputUsernameRegister.value} is already taken`
                    );
                }
            }
        });
    });
});
