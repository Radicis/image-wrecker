var imgContainer = $('#imgContainer');
var originalImgContainer = $('#originalImgContainer');
var speedInput = $('#speed');
var charsToChangeInput = $('#charsToChange');
var base64ImageString;

/**
 * Class to control image wrecking
 * @constructor
 */
function ImageWreck() {
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

    var newVal = base64ImageString;

    if (!newVal) {
        alert('Upload an image first');
        return false;
    }

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

/**
 * Clear the interval and reset the image to its original state
 */
ImageWreck.prototype.resetIt = function () {
    clearInterval(this.interval);
    imgContainer.attr('src', base64ImageString);
}

/**
 * Clear the interval and reset the image to its original state
 */
ImageWreck.prototype.clearIt = function () {
    clearInterval(this.interval);
    imgContainer.attr('src', '');
    originalImgContainer.attr('src', '');
    base64ImageString = null;
}

/**
 * Browse for a file and store the bage64 string
 * @param input 
 */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#fileInput').attr('src', e.target.result);
            imgContainer.attr('src',  e.target.result);
            originalImgContainer.attr('src', e.target.result);

        };
        reader.readAsDataURL(input.files[0]);
    }
}




