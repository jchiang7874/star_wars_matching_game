var initiate = ['c3po', 'darth_vader', 'jar_jar', 'leia', 'luke', 'obi', 'r2d2', 'storm', 'yoda', '!!c3po', '!!darth_vader', '!!jar_jar', '!!leia', '!!luke', '!!obi', '!!r2d2', '!!storm', '!!yoda'],
    apprentice = ['ackbar', 'c3po', 'darth_maul', 'darth_vader', 'ewoks', 'jar_jar', 'leia', 'luke', 'obi', 'r2d2', 'storm', 'yoda', '!!ackbar', '!!c3po', '!!darth_maul', '!!darth_vader', '!!ewoks', '!!jar_jar', '!!leia', '!!luke', '!!obi', '!!r2d2', '!!storm', '!!yoda'],
    knight = ['ackbar', 'c3po', 'darth_maul', 'darth_vader', 'ewoks', 'jar_jar', 'leia', 'luke', 'obi', 'r2d2', 'storm', 'yoda', 'bossk', 'ig88', 'boba', '!!boba', '!!bossk', '!!ig88', '!!ackbar', '!!c3po', '!!darth_maul', '!!darth_vader', '!!ewoks', '!!jar_jar', '!!leia', '!!luke', '!!obi', '!!r2d2', '!!storm', '!!yoda'],
    master = ['ackbar', 'c3po', 'darth_maul', 'darth_vader', 'ewoks', 'jar_jar', 'leia', 'luke', 'obi', 'r2d2', 'storm', 'yoda', 'bossk', 'ig88', 'boba', 'nien', 'thrawn', 'xizor', '!!xizor', '!!thrawn', '!!nien', '!!boba', '!!bossk', '!!ig88', '!!ackbar', '!!c3po', '!!darth_maul', '!!darth_vader', '!!ewoks', '!!jar_jar', '!!leia', '!!luke', '!!obi', '!!r2d2', '!!storm', '!!yoda'];

var quotes = ['this is a new day, a new beginning. - ahsoka tano', 'stay on target. -gold five', 'great, kid. don\'t get cocky. -han solo', 'mind tricks don\'t work on me. -watto', 'never tell me the odds. -han solo', 'your eyes can deceive you. -obi-wan kenobi', 'So this is how liberty dies... -padm\xe9 amidala', 'it\'s a trap! -admiral ackbar',
    'i\'ve got a bad feeling about this. -everyone', 'i find your lack of faith disturbing. -darth vader', 'there is no such thing as luck. -obi-wan kenobi', 'somebody has to save our skins. -leia organa', 'do. or do not. there is no try. -yoda', 'your focus determines your reality. -qui-gon jinn', 'it\'s not my fault. -han solo', 'fear is the path to the dark side. - yoda'];

var memory_values = [],
    memory_tile_ids = [],
    tile_arr,
    tiles_flipped = 0,
    count = 0,
    counter_display = $("#counter")[0],
    text_display = "Number of times clicked: ";

var word_i = 0,
    word_el = document.getElementById('word');

$(document).ready(function() {
    default_tile();
    wordSlide();
    counter_display.innerHTML = "<p>Select a level to start</p> <p>May the Force be with you</p>"
});

function default_tile() {
    $("#board").append('<img src="imgs/starwarslogo.jpg" alt="default" class="default"/>');

}

Array.prototype.tile_shuffle = function () {
    var i, j, temp;

    for (i = 0; i < this.length; i++) {
        j = Math.floor(Math.random() * this.length);
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}


function nextWord() {
    console.log(quotes);
    word_i++;
    word_el.style.opacity = 0;
    if (word_i > (quotes.length - 1)) {
        word_i = 0;
    }
    setTimeout('wordSlide()', 1000);
}

function wordSlide() {
    word_el.innerHTML = quotes[word_i];
    word_el.style.opacity = 1;
    setTimeout('nextWord()', 2000);
}

function flip_tile(tile, val) {
    console.log(tile);
    console.log(val);
    if (tile.className == "bkground") {
        tile.className = "img_tiles";
    } else {
        tile.className = "bkground";
    }

    if (memory_values.length < 2) {
        memory_values.push(val);
        memory_tile_ids.push(tile.id);

        if (memory_values.length == 2) {
            if(memory_values[0].charAt(0) === "!") {
                memory_values[0] = memory_values[0].substr(2);
            } else if (memory_values[1].charAt(0) === "!") {
                memory_values[1] = memory_values[1].substr(2);
            }
            //check if 2 tiles match
            if (memory_values[0] == memory_values[1]) {
                tiles_flipped += 2;
                count++;
                counter_display.innerText = text_display + count;
                document.getElementById(memory_tile_ids[0]).onclick = "";
                document.getElementById(memory_tile_ids[1]).onclick = "";

                memory_values = [];
                memory_tile_ids = [];

                // check if entire board is cleared
                if(tiles_flipped == tile_arr.length){
                    alert("Board cleared! Choose a level to generate new board.");
                    $("#board").empty();
                    default_tile();
                    count = 0;
                    tiles_flipped = 0;
                    counter_display.innerText = text_display + count;
                }

            } else {

                function flipBack(){
                    //flip unmatched tiles back
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);

                    tile_1.className = "bkground";
                    tile_2.className = "bkground";

                    memory_values = [];
                    memory_tile_ids = [];
                    count++;
                    counter_display.innerText = text_display + count;
                }
                    setTimeout(flipBack, 400);
            }
        }
    }
}

function generateBoard(arr) {
    activeBtn(arr);

    $("#board").empty();
    tile_arr = arr;
    arr.tile_shuffle();

    for (var i = 0; i < arr.length; i++) {
        $("#board").append('<div class="tile_border"><img src="imgs/'+arr[i]+'.png" alt="tiles" class="bkground" id="tile_'+i+'" onclick="flip_tile(this, \''+arr[i]+'\')"/></div>');
    }
    counter_display.innerText = text_display + count;
}

function activeBtn (arr) {
    if (arr.length == 18) {
        $("#btn_initiate").attr('src', 'imgs/active_initiate.png');
        $("#btn_appren").attr('src', 'imgs/appren.png');
        $("#btn_knight").attr('src', 'imgs/knight.png');
        $("#btn_master").attr('src', 'imgs/master.png');
    } else if (arr.length == 24) {
        $("#btn_initiate").attr('src', 'imgs/initiate.png');
        $("#btn_appren").attr('src', 'imgs/active_appren.png');
        $("#btn_knight").attr('src', 'imgs/knight.png');
        $("#btn_master").attr('src', 'imgs/master.png');
    } else if (arr.length == 30) {
        $("#btn_initiate").attr('src', 'imgs/initiate.png');
        $("#btn_appren").attr('src', 'imgs/appren.png');
        $("#btn_knight").attr('src', 'imgs/active_knight.png');
        $("#btn_master").attr('src', 'imgs/master.png');
    } else {
        $("#btn_initiate").attr('src', 'imgs/initiate.png');
        $("#btn_appren").attr('src', 'imgs/appren.png');
        $("#btn_knight").attr('src', 'imgs/knight.png');
        $("#btn_master").attr('src', 'imgs/active_master.png');
    }
}

function masterTiles() {
    var master = document.getElementsByClassName('tile_border');
    for (var i = 0; i < master.length; i++) {
        master[i].className += " master";
    }
}








