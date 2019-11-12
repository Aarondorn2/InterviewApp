const popupWindow = '<div class="popup-window"><div class="popup-window-menu"><span class="popup-window-close">x</span></div><img src="https://cataas.com/cat?"></div>';

let interviewApp = {
  addPopup: true,
  isRunning: false,
  lives: 3,
  score: 0,
  zIndex: 1,

  interval: null,

  addPopupWindow() {
    if (!interviewApp.addPopup) return;

    let left = `${Math.floor((Math.random() * 75))}vw`;
    let top = `${Math.floor((Math.random() * 90))}vh`;
    let zIndex = ++interviewApp.zIndex;

    let popup = $(popupWindow.replace('?', `?${zIndex % 60}`)).css({ left, top, zIndex });
    $('.container').append(popup);

    interviewApp.writeScore(--interviewApp.score);
  },
  close(e) {
    e.stopPropagation();
    $(this).parent().parent().remove();
    interviewApp.writeScore(++interviewApp.score);
  },
  missClick() {
    if (!interviewApp.isRunning) return;
    interviewApp.removeLife();
    
    if (interviewApp.lives === 0) {
      interviewApp.isRunning = false;
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
    let hearts = '';
    interviewApp.lives--;
    for (i = 0; i < interviewApp.lives; i++) {
      hearts += '♥️ ';
    }
    $('#lives').html(hearts);
  },
  restart() {
    location.reload();
  },
  start(e) {
    e.stopPropagation();
    $('.intro').hide();
    interviewApp.isRunning = true;

    interviewApp.interval = setInterval(interviewApp.addPopupWindow, 1500);
  },
  stopPopups() {
    interviewApp.addPopup = false;
  },
  writeScore(score) {
    $('#score').html(score);
  }
};

$(document).ready(function() {
  $('#start').on('click', interviewApp.start);
  $('#restart').on('click', interviewApp.restart);

  $('body').on('click', interviewApp.missClick);
  $('body').on('click', '.popup-window-close', interviewApp.close);
});
