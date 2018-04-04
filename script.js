$(function ready() {
  $('.js-signatures').load('podpisi.txt');
  $('.js-signaturecount').text('1316');

  $('.js-more').on('click', function() {
    $(this).remove();
    $('.js-signatures').removeClass('show-less');
  });

  $('#podpisi-peticijo').on('submit', function (event) {
    event.preventDefault();
    $.get('http://djapi.knedl.si/sign/',
      {
        name: $('#signaturename').val(),
        email: $('#signatureemail').val(),
        peticija: 'sepetalka'
      }, function (r) {
        if (r == 1) {
          $('#podpisi-peticijo').hide();
          $('#hvala-podpis').show();
        }
      }
    );
  });

  $('#hvala-podpis button').on('click', function () {
    $('#signaturename').val('');
    $('#signatureemail').val('');
    $('#podpisi-peticijo').show();
    $('#hvala-podpis').hide();
  });

  var $linkElement = $('#shorturl');
  $('.js-copyurl').on('click', function () {
    var copied = $linkElement.select();
    var success = document.execCommand("copy");
    if (success) {
      $(this).text('SKOPIRANO!');
    }
  });

  var link = document.location.href;
  $linkElement.val(link);

  $.ajax({
    method: 'POST',
    url: 'https://djnd.si/yomamasofat/',
    data: {
      fatmama: document.location.href,
    },
    success: function (resp) {
      $linkElement.val(resp);
      link = resp;
    }
  });

  var title = 'Ne bomo odnehali!';
  var text = 'Prepričajmo varuhinjo človekovih pravic, da Zakon o tujcih vloži v ustavno presojo.';
  var hashtags = '';
  //social
  $('.js-facebook').on('click', function () {
    var url = 'https://www.facebook.com/dialog/feed?app_id=301375193309601&redirect_uri=' + encodeURIComponent(document.location.href) + '&link=' + encodeURIComponent(document.location.href) + '&ref=responsive&name=' + encodeURIComponent(title);
    window.open(url, '_blank');
    ga('send', 'event', 'social', 'facebook');
    return false;
  });
  $('.js-twitter').on('click', function () {
    var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text + ' ' + hashtags + ' ' + link);
    window.open(url, '_blank');
    ga('send', 'event', 'social', 'twitter');
    return false;
  });
  $('.js-gplus').on('click', function () {
    var url = 'https://plus.google.com/share?url=' + encodeURIComponent(document.location.href);
    window.open(url, '_blank');
    ga('send', 'event', 'social', 'gplus');
    return false;
  });
  $('.js-email').on('click', function () {
    var url = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + text + ' ' + encodeURIComponent(link);
    window.open(url, '_blank');
    ga('send', 'event', 'social', 'email');
    return false;
  });
});
