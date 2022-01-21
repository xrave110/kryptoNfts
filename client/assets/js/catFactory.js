
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: ' + code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code) {
    $('.cat__mouth-contour, .cat__chest_inner, .cat__tail').css('background', '#' + color)  //This changes the color of the cat
    $('#mouthcode').html('code : ' + code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the mouth color part of the DNA that is displayed below the cat
}

function eyesColor(color,code) {
    $('.cat__eye span').css('background', '#' + color)  //This changes the color of the cat
    $('#eyescode').html('code : ' + code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the mouth color part of the DNA that is displayed below the cat
}

function earsColor(color,code) {
    $('.cat__ear--left, .cat__ear--right').css('background', '#' + color)  //This changes the color of the cat
    $('#earscode').html('code : ' + code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the mouth color part of the DNA that is displayed below the cat
}

//Eyes variants
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeshapecode').html('code: Basic')
            break
        case 2:
            chillEyes()
            $('#eyeshapecode').html('code: Chill')
            break
        case 3:
            upEyes()
            $('#eyeshapecode').html('code: Up')
            break
        case 4:
            moonEyes()
            $('#eyeshapecode').html('code: Moon')
            break
        case 5:
            tinyEyes()
            $('#eyeshapecode').html('code: Tiny')
    }
}

async function normalEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
    await $('.cat__eye').find('span').css('width', '42px')
    await $('.cat__eye').find('span').css('height', '35px')
}

async function chillEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
    await $('.cat__eye').find('span').css('width', '42px')
    await $('.cat__eye').find('span').css('height', '25px')
    await $('.cat__eye').find('span').css('border-bottom', '15px solid')
}

async function upEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
    await $('.cat__eye').find('span').css('width', '30px')
    await $('.cat__eye').find('span').css('height', '25px')
}

async function moonEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
    await $('.cat__eye').find('span').css('border-bottom', '13px solid')
    await $('.cat__eye').find('span').css('border-top', '13px solid')
    await $('.cat__eye').find('span').css('width', '42px')
    await $('.cat__eye').find('span').css('height', '35px')
}

async function tinyEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
    await $('.cat__eye').find('span').css('border-left', '10px solid')
    await $('.cat__eye').find('span').css('border-right', '10px solid')
    await $('.cat__eye').find('span').css('width', '42px')
    await $('.cat__eye').find('span').css('height', '35px')
}



//Decorations
function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            normaldecoration()
            $('#decorationcode').html('code: Basic')
            break
        case 2:
            normaldecoration()
            $('#decorationcode').html('code: Common')
            commondecoration()
            break
        case 3:
            normaldecoration()
            $('#decorationcode').html('code: Insane')
            insanedecoration()
            break
    }
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function commondecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(5deg)", "height": "48px", "width": "13px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(10deg)", "height": "37px", "width": "12px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(10deg)", "height": "37px", "width": "12px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function insanedecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots_first').css({ "transform": "rotate(33deg)", "height": "37px", "width": "18px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-33deg)", "height": "37px", "width": "18px", "top": "1px", "border-radius": "0 50% 50% 50%" })
    $('.cat__head-dots').css({ "transform": "rotate(3deg)", "height": "52px", "width": "19px", "top": "1px", "border-radius": "0 0 50% 50%" })
}

async function decorationColor1(color, code){
    $('.cat__head-dots').css('background', '#' + color)
    $('#decorationmidcode').html('code : ' + code)
    $('#dnadecorationMid').html(code)
}

async function decorationColor2(color, code){
    $('.cat__head-dots_first').css('background', '#' + color)
    $('.cat__head-dots_second').css('background', '#' + color)
    $('#decorationsidescode').html('code : ' + code)
    $('#dnadecorationSides').html(code)
}

async function animationVariation(num){
    $('#dnaanimation').html(num)
    switch(num){
        case 1:
            moveHead()
            $('#animationcode').html('code: Moving head')
            break;
        case 2:
            moveTail()
            $('#animationcode').html('code: Moving tail')
            break;
        case 3:
            blink()
            $('#animationcode').html('code: Blinking')
            break;
        case 4:
            moveMouths()
            $('#animationcode').html('code: Moving mouths')
            break;
        case 5:
            moveEyes()
            $('#animationcode').html('code: Moving eyes')
            break;
        case 6:
            increaseEars()
            $('#animationcode').html('code: Increasing ears')
            break;
    }

}

async function removeAnimation(){
    $('#head').removeClass("moveHead")
    $('#tail').removeClass("moveTail")
    $('#eyeLeft').removeClass("blink")
    $('#eyeRight').removeClass("blink")
    $('#mouthLeft').removeClass("moveMouth")
    $('#mouthRight').removeClass("moveMouth")
    $('#eyeLeft').removeClass("moveEye")
    $('#eyeRight').removeClass("moveEye")
    $('#leftEar').removeClass("increaseEar")
    $('#rightEar').removeClass("increaseEar")
}

async function moveHead(){
    removeAnimation()
    $('#head').addClass("moveHead")
}

async function moveTail(){
    removeAnimation()
    $('#tail').addClass("moveTail")
}

async function blink(){
    removeAnimation()
    $('#eyeLeft').addClass("blink")
    $('#eyeRight').addClass("blink")
}

async function moveMouths(){
    removeAnimation()
    $('#mouthLeft').addClass("moveMouth")
    $('#mouthRight').addClass("moveMouth")
}

async function moveEyes(){
    removeAnimation()
    $('#eyeLeft').addClass("moveEye")
    $('#eyeRight').addClass("moveEye")
}

async function increaseEars(){
    removeAnimation()
    $('#leftEar').addClass("increaseEar")
    $('#rightEar').addClass("increaseEar")
}

async function showColors(){
    $('#catColors').removeClass('hidden')
    $('#catFeatures').addClass('hidden')
}

async function showFeatures(){
    $('#catFeatures').removeClass('hidden')
    $('#catColors').addClass('hidden')
}

