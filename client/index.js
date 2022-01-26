var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x136c9fEc0c590B780D449A8fCB0237f387e52A55"

const ethereumButton = document.querySelector('.js-enable-connection');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  if(ethereum.isMetaMask) {
    ethereum.request({ method: 'eth_requestAccounts' });
    window.ethereum.enable().then(function(accounts){
      instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
      user = accounts[0];
      console.log("Deployed instance: \n");
      console.log(instance);
    }).then(()=>{
      document.getElementById("connect").innerHTML = "Connected(" + user.substr(0, 4) + substr(-4, 4) + ")";
    })
  }
  else {
    ethereum.request({ method: 'eth_requestAccounts' });
    window.ethereum.enable().then(function(accounts){
      instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
      user = accounts[0];
      console.log("Deployed instance: \n");
      console.log(instance);
    })
    document.getElementById("connect").innerHTML = "Connect >>";
  }

});

$(document).ready(function(){
    if(ethereum.isMetaMask) {
      ethereum.request({ method: 'eth_requestAccounts' });
      window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];
        console.log("Deployed instance: \n");
        console.log(instance);
        
        instance.events.Birth().on('data', function(event){
          console.log(event);
          $("#action").removeClass('hidden')
          $("#actiontext").css("display", "block");
          $("#actiontext").text("The kitty has been created:\n");
          $("#parametertext").text("owner: " + event.returnValues.owner +
          " kittyId: " + event.returnValues.kittenId + " mumId: " + event.returnValues.mumId + 
          " dadId: " + event.returnValues.dadId + "\n genes: " + event.returnValues.genes);
            
        })
        .on('error', console.error);
      }).then(()=>{
        document.getElementById("connect").innerHTML = "Connected (" + user + ")";
      })
    }
})

$('#create').click(()=>{
  dna = getDna();
  instance.methods.createNewGen0(dna).send({}, function(error, txHash){
    if(error){
      console.log(error);
    }
    else{
      console.log(txHash)
      $("#action").removeClass('hidden')
      $("#actiontext").text("The request to create kitty has been sent")
    }
  });
})
