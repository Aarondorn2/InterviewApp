const popupWindow = '<div class="popup-window"><div class="popup-window-menu"><span class="popup-window-close">x</span></div><img src="http://cdn.healthcaresource.com/assets/svg/hcs-horizontal.svg"></div>';

let interviewApp = {
  score: 0,
  lives: 3,
  zIndex: 1,
  windowWidth: 0,
  windowHeight: 0,

  interval: null,

  addPopupWindow() {
    let top = Math.floor((Math.random() * interviewApp.windowHeight));
    let left = Math.floor((Math.random() * interviewApp.windowWidth));

    $('.container').append(popupWindow);
    $('.popup-window').last()
      .css('z-index', interviewApp.zIndex++ + 1)
      .css('top', top + 'px')
      .css('left', left + 'px');

    interviewApp.writeScore(--interviewApp.score);
  },
  missClick() {
    interviewApp.removeLife();
  	
  	if (interviewApp.lives === 0) {
      clearInterval(interviewApp.interval);
  		$('#final-score-text').html(`Final score: ${interviewApp.score}`);
  		$('#game-over').show();
  	} else {
      for (i = 0; i < 5; i++) {
        interviewApp.addPopupWindow();
      }
    }
  },
  removeLife() {
		let hearts = "";
    interviewApp.lives--;
		for (i = 0; i < interviewApp.lives; i++) {
			hearts += "♥️ ";
		}
		$('#lives').html(hearts);
  },
  start() {
  	$('.intro').hide();
  	$('body').append('<div id="bg"></div>');

    interviewApp.interval = setInterval(interviewApp.addPopupWindow, 750);
  },
  writeScore(score) {
    $('#score').html(score);
  }
};

$(document).ready(function() {
  interviewApp.windowWidth = $(window).width() - 400;
  interviewApp.windowHeight = $(window).height() + 400; 

  $('#start').on('click', interviewApp.start);
	$('#restart').on('click', function() { location.reload(); });


	$('body').on('click', '#bg', interviewApp.missClick);
	$('body').on('click', '.popup-window', interviewApp.missClick);
	$('body').on('click', '.popup-window-close', function(e) {
    e.stopPropagation();
		$(this).parent().parent().hide();
		interviewApp.writeScore(++interviewApp.score);
	});
});
