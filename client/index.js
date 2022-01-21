var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xDd19A7Ed2423D55602453eAa2cf0628Afe6c2dC8"

const ethereumButton = document.querySelector('.enableEthereumButton');

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
      document.getElementById("connect").innerHTML = "Connected (" + user + ")";
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
