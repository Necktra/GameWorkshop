let player = document.querySelector("#player");

document.onkeyup = function () {

    let x = getComputedStyle(player).left;
    let y = getComputedStyle(player).top;

    x = parseInt(x);
    y = parseInt(y);

    if (event.keyCode == 39) {
        player.style.left = x + 100 + 'px';
    }
    if (event.keyCode == 37) {
        if (x - 100 >= 0) {
            player.style.left = x - 100 + 'px';
        }
    }
    if (event.keyCode == 38) {
        player.style.top = y - 100 + 'px';
    }
    if (event.keyCode == 40) {
        player.style.top = y + 100 + 'px';
    }
}

//ожидание ответа от сервака
$.ajaxSetup({
    async: false
});

let update_id = 0;

setInterval(function () {

    let x = getComputedStyle(player).left;
    let y = getComputedStyle(player).top;

    x = parseInt(x);
    y = parseInt(y);



    let data = $.get('https://api.telegram.org/bot1833986441:AAEyyZYarrHb8D9CIpOa3yEWCWx24qZBh3w/getUpdates?offset=' + update_id);
    let dataArr = JSON.parse(data.responseText);

    for (num in dataArr['result']) {
       

        let text = dataArr['result'][num]['message']['text'];

        if (text == 'D') {
            player.style.left = x + 100 + 'px';
            player.style.backgroundImage = 'url("https://ironlinks.ru/nordic/gamemk/right.png")'
        }

        if (text == 'A') {
            if (x - 100 >= 0) {
                player.style.left = x - 100 + 'px';
                player.style.backgroundImage = 'url("https://ironlinks.ru/nordic/gamemk/left.png")'
            }
        }
        if (text == 'W') {
            player.style.top = y - 100 + 'px';
            player.style.backgroundImage = 'url("https://ironlinks.ru/nordic/gamemk/up.png")'
        }
        if (text == 'S') {
            player.style.top = y + 100 + 'px';
            player.style.backgroundImage = 'url("https://ironlinks.ru/nordic/gamemk/down.png")'
        }

        //сохраняется ид последнего сообщения
        update_id = dataArr['result'][num]['update_id'];
    }

    //перенести в условие
update_id += 1;

}, 100);