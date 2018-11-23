var imgTextArea = $('#imgText');
var imgContainer = $('#imgContainer');
var originalImgContainer = $('#originalImgContainer');
var speedInput = $('#speed');
var charsToChangeInput = $('#charsToChange');

/**
 * Class to control image wrecking
 * @param options
 * @constructor
 */
function ImageWreck(options) {
    this.setOptions();
}

/**
 * Set the options which control wrecking based on input values
 */
ImageWreck.prototype.setOptions = function () {
    this.options = {
        speed: speedInput.val() || 1000,
        charsToChange: charsToChangeInput.val() || 1,
        startIndex: 35 // Need to find out what the important chars in the string are
    };
};

/**
 * Begin wrecking the image on a timeout dictated by the speed option, defaults to 1s
 */
ImageWreck.prototype.doIt = function () {
    const self = this;

    var imgTextAreaValue = imgTextArea.val();

    let newVal = imgTextArea.val();

    originalImgContainer.attr('src', imgTextAreaValue);

    this.interval = setInterval(function () {

        for (var i = 0; i < self.options.charsToChange; i++) {
            var randC = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            var index = Math.floor(Math.random() * newVal.length) + self.options.startIndex;

            newVal = newVal.substr(0, index) + randC + newVal.substr(index + randC.length);
        }

        imgContainer.attr('src', newVal);
    }, self.options.speed);
};

/**
 * Stops wrecking so you can see your beautiful creation
 */
ImageWreck.prototype.stopIt = function () {
    clearInterval(this.interval);
};




