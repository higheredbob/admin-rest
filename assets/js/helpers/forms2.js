
$('.selector').click(function(){
    if($(this).hasClass('sign')){

        $('.email-section, password-section, repeat-password-section').removeClass('folded').addClass('fold-up');
        $('#login').removeClass('next');
        $(this).addClass('next');
    } else {

        $('#type').text('SignUp');
        $('.selector-section, .signin-section, .sign-password, .repeat-signin-sect').removeClass('folded').addClass('fold-up');
        $('.email-section').removeClass('folded');
        $('.success').css('margin-top', -75);
        $('#head').css('top', '13px');

        $('#signup').removeClass('next');
        $(this).addClass('next');
    }
})
$('.next-button.signin').click(function(){
    $('.selector-section').addClass('fold-up');
    $('.signin-section').removeClass('folded');
});
$('.next-button.loggin').click(function(){
    $('.selector-section').addClass('fold-up');
    $('.email-section').removeClass('folded');
});
$('.signin-em').on("change keyup paste", function(){
    if($(this).val()){
        $('.closed-email').addClass('next');
    } else {
        $('.closed-email').removeClass('next');
    }
});
$('.next-button').hover(function(){
    $(this).css('cursor', 'pointer');
});
$('.next-button.signin-closed').click(function(){
    $('.signin-section').addClass('fold-up');
    $('.sign-password').removeClass('folded');
});
$('.login-pass').on('change keyup paste', function(){
    if($(this).val()){
        $('.icon-signin').addClass('next');

    } else {
        $('.icon-signin').removeClass('next');
    }
});
$('.next-button').hover(function(){
    $(this).css('cursor', 'pointer');
});
$('.next-button.login-word').click(function(){
    $('.accounts').text('LOGIN SUCCESS')
    $('.sign-password').addClass('fold-up');
     $('.success').css("marginTop", 0);;
})

$('.email').on("change keyup paste",
  function(){
    if($(this).val()){
      $('.icon-paper-plane').addClass("next");
    } else {
      $('.icon-paper-plane').removeClass("next");
    }
  }
);

$('.next-button').hover(
  function(){
    $(this).css('cursor', 'pointer');
  }
);

$('.next-button.email').click(
  function(){
    console.log("Something");
    $('.email-section').addClass("fold-up");
    $('.password-section').removeClass("folded");
  }
);

$('.password').on("change keyup paste",
  function(){
    if($(this).val()){
      $('.icon-lock').addClass("next");
    } else {
      $('.icon-lock').removeClass("next");
    }
  }
);

$('.next-button').hover(
  function(){
    $(this).css('cursor', 'pointer');
  }
);

$('.next-button.password').click(
  function(){
    console.log("Something");
    $('.password-section').addClass("fold-up");
    $('.repeat-password-section').removeClass("folded");
  }
);

$('.repeat-password').on("change keyup paste",
  function(){
    if($(this).val()){
      $('.icon-repeat-lock').addClass("next");
    } else {
      $('.icon-repeat-lock').removeClass("next");
    }
  }
);

$('.next-button.repeat-password').click(
  function(){
    console.log("Something");
    $('.repeat-password-section').addClass("fold-up");
    $('.success').css("marginTop", 0);
  }
);
