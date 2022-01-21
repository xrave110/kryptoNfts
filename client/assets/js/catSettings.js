
var colors = Object.values(allColors())

var defaultDNA = {
    "headColor" : 10,
    "mouthColor" : 53,
    "eyesColor" : 46,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
//   $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headColor],dna.headColor)
    $('#bodycolor').val(dna.headColor)
    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthbodytailcolor').val(dna.mouthColor)
    eyesColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyescolor').val(dna.eyesColor)
    earsColor(colors[dna.earsColor],dna.earsColor)
    $('#earscolor').val(dna.earsColor)

    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#decoration').val(dna.decorationPattern)
    decorationColor1(colors[dna.decorationMidcolor], dna.decorationMidcolor)
    $('#decorationmid').val(dna.decorationMidcolor)
    decorationColor2(colors[dna.decorationSidescolor], dna.decorationSidescolor)
    $('#decorationsides').val(dna.decorationSidescolor)

    animationVariation(dna.animation)
    $('#animation').val(dna.animation)
}

// Changing cat colors
$('#bodycolor').change(()=>{
  var colorVal = $('#bodycolor').val()
  headColor(colors[colorVal],colorVal)
})

$('#mouthbodytailcolor').change(()=>{
  var colorVal = $('#mouthbodytailcolor').val()
  mouthColor(colors[colorVal],colorVal)
})

$('#eyescolor').change(()=>{
  var colorVal = $('#eyescolor').val()
  eyesColor(colors[colorVal],colorVal)
})

$('#earscolor').change(()=>{
  var colorVal = $('#earscolor').val()
  earsColor(colors[colorVal],colorVal)
})

$('#eyeshape').change(()=>{
  eyeVariation(parseInt($('#eyeshape').val()))
})

$('#decoration').change(()=>{
  decorationVariation(parseInt($('#decoration').val()))
})

$('#decorationmid').change(()=>{
  decorationColor1(colors[$('#decorationmid').val()], parseInt($('#decorationmid').val()))
})

$('#decorationsides').change(()=>{
  decorationColor2(colors[$('#decorationsides').val()], parseInt($('#decorationsides').val()))
})

$('#animation').change(()=>{
  animationVariation(parseInt($('#animation').val()))
})

$('#colors').click(()=>{
  showColors()
})

$('#features').click(()=>{
  showFeatures()
})

$('#random').click(()=>{

  randomDna = {}
  randomDna["headColor"] = random(10,99)
  randomDna["mouthColor"] = random(10,99)
  randomDna["eyesColor"] = random(10,99)
  randomDna["earsColor"] = random(10,99)
  randomDna["eyesShape"] = random(1,7)
  randomDna["decorationPattern"] = random(1,7)
  randomDna["decorationMidcolor"] = random(10,99)
  randomDna["decorationSidescolor"] = random(10,99)
  randomDna["animation"] = random(1,7)
  renderCat(randomDna)
})

$('#default').click(()=>{
  renderCat(defaultDNA)
})