pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
//import "./Contract.sol";

contract KittyContract is IERC721 {

    //Data structures
    struct Kitty{
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }
    event Birth(
        address owner,
        uint256 kittenId,
        uint256 genes,
        uint32 mumId,
        uint32 dadId
    );

    //Global variables
    string public constant kittyName = "KittyERC721";
    string public constant kittySymbol = "KTT721";
    uint256 public constant CREATION_LIMIT_FOR_GEN = 10;
    uint256 public genCntr;
    address public owner;
    mapping(address => uint256) public ownershipCounter;
    mapping(uint256 => address) public kittyIdToOwner;
    mapping(uint256 => address) public kittyIndexToApproved;
    Kitty[] public kitties;

    //Local variables
    bytes4 internal constant ERC721CONF = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    bytes4 internal _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 internal _INTERFACE_ID_ERC165 = 0x01ffc9a7;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    //Constructor
    constructor() {
        owner = msg.sender;
    }

    //Modifiers
    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
    modifier tranferableFrom( address _from, address _to, uint256 _tokenId){
        require((msg.sender == _from) || 
                (msg.sender == kittyIndexToApproved[_tokenId]) || 
                (true == _operatorApprovals[msg.sender][_from]));
        require(_from == kittyIdToOwner[_tokenId]);
        require(_to != address(0));
        require(_tokenId < kitties.length);
        _;
    }

    // **** ERC165 - Functions
    function supportInterface(bytes4 _interfaceId) external view returns (bool){
        return (_interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
    }

    // **** ERC721 - Functions
    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance){
        return ownershipCounter[owner];
    }

    /*
     * @dev Returns the total number of tokens in circulation.
     */
    function totalSupply() external view returns (uint256 total){
        return kitties.length;
    }

    /*
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory tokenName){
        return kittyName;
    }

    /*
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory tokenSymbol){
        return kittySymbol;
    }
    
    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     */
    function ownerOf(uint256 tokenId) external view returns (address owner){
        return kittyIdToOwner[tokenId];
    }


     /* @dev Transfers `tokenId` token from `msg.sender` to `to`.
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 tokenId) external{
        require(to != address(0), "Recipient cannot have address 0");
        require(to != address(this), "Recipient cannot have contract address");
        require(kittyIdToOwner[tokenId] == msg.sender, "Kitty must be owned by a sender");
        
        _transfer(msg.sender, to, tokenId);
    }

    /// @notice Change or reaffirm the approved address for an NFT
    /// @dev The zero address indicates there is no approved address.
    ///  Throws unless `msg.sender` is the current NFT owner, or an authorized
    ///  operator of the current owner.
    /// @param _approved The new approved NFT controller
    /// @param _tokenId The NFT to approve
    function approve(address _approved, uint256 _tokenId) external{
        require((kittyIdToOwner[_tokenId] == msg.sender) || (kittyIndexToApproved[_tokenId] == msg.sender), 
            "Kitty must be approved or owned by a sender");
        _approve(_approved, _tokenId);
        emit Approval(msg.sender, _approved, _tokenId);
    }

    /// @notice Enable or disable approval for a third party ("operator") to manage
    ///  all of `msg.sender`'s assets
    /// @dev Emits the ApprovalForAll event. The contract MUST allow
    ///  multiple operators per owner.
    /// @param _operator Address to add to the set of authorized operators
    /// @param _approved True if the operator is approved, false to revoke approval
    function setApprovalForAll(address _operator, bool _approved) external{
        //require((kittyIdToOwner[_tokenId] == msg.sender), "Kitty must be owned by a sender");
        require(_operator != msg.sender, "Operator address must be different than sender's address");

        /*ownersCats = getAllCatsFor(msg.sender);
        for(uint256 i; i<ownersCats.length; i++) {
            _approve(_operator, ownersCats[i]);
        }*/
        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);

    }

    /// @notice Get the approved address for a single NFT
    /// @dev Throws if `_tokenId` is not a valid NFT.
    /// @param _tokenId The NFT to find the approved address for
    /// @return The approved address for this NFT, or the zero address if there is none
    function getApproved(uint256 _tokenId) external view returns (address){
        require(_tokenId < kitties.length, "Token must exist");
        return kittyIndexToApproved[_tokenId];
    }

    /// @notice Query if an address is an authorized operator for another address
    /// @param _owner The address that owns the NFTs
    /// @param _operator The address that acts on behalf of the owner
    /// @return True if `_operator` is an approved operator for `_owner`, false otherwise
    function isApprovedForAll(address _owner, address _operator) external view returns (bool){
        return _operatorApprovals[_owner][_operator];
    }

    /// @notice Transfers the ownership of an NFT from one address to another address
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `_from` is
    ///  not the current owner. Throws if `_to` is the zero address. Throws if
    ///  `_tokenId` is not a valid NFT. When transfer is complete, this function
    ///  checks if `_to` is a smart contract (code size > 0). If so, it calls
    ///  `onERC721Received` on `_to` and throws if the return value is not
    ///  `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    /// @param data Additional data with no specified format, sent in call to `_to`
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external 
    tranferableFrom(_from, _to, _tokenId) {

        _safeTransfer(_from, _to, _tokenId, data);
    }

    /// @notice Transfers the ownership of an NFT from one address to another address
    /// @dev This works identically to the other function with an extra data parameter,
    ///  except this function just sets data to "".
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external
    tranferableFrom(_from, _to, _tokenId) {

        _safeTransfer(_from, _to, _tokenId, "");
    }

    /// @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
    ///  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
    ///  THEY MAY BE PERMANENTLY LOST
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `_from` is
    ///  not the current owner. Throws if `_to` is the zero address. Throws if
    ///  `_tokenId` is not a valid NFT.
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    function transferFrom(address _from, address _to, uint256 _tokenId) external{
        require((msg.sender == _from) || 
                (msg.sender == kittyIndexToApproved[_tokenId]) || 
                (true == _operatorApprovals[msg.sender][_from]));
        require(_from == kittyIdToOwner[_tokenId]);
        require(_to != address(0));
        require(_tokenId < kitties.length);

        _transfer(_from, _to, _tokenId);
    }

    // **** Contract specific - Global functions
    function breedCat(uint256 _dadId, uint256 _mumId) public returns(uint256){
        
        //Check if msg.sender owns this cats
        require((kittyIdToOwner[_dadId] == msg.sender) && (kittyIdToOwner[_mumId] == msg.sender));
        
        //MixDna
        uint256 newKittyGenes = _mixDna(kitties[_dadId].genes, kitties[_mumId].genes);
        uint256 kittyGeneration = ((kitties[_dadId].generation + kitties[_mumId].generation) / 2) + 1;
        //Create cat with this Dna
        uint256 newKittyId = _createKitty(newKittyGenes, uint32(_mumId), uint32(_dadId), uint16(kittyGeneration), msg.sender);
        return newKittyId;
    }
    
    function getAllCatsFor(address _owner) external view returns (uint[] memory cats){ // seems to be better solution because this function is only view function so it is called for free (it does not matter the operation amount)
        uint[] memory result = new uint[](ownershipCounter[_owner]);
        uint counter = 0;
        for (uint i = 0; i < kitties.length; i++) {
            if (kittyIdToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    /* If the returns is specified in such way there is no need to write return, only asignments are enough */
    function getKitty(uint256 _tokenId) external view returns(
        uint256 genes,
        uint256 birthTime,
        uint256 mumId,
        uint256 dadId,
        uint256 generation,
        address owner) 
    {
        Kitty storage kitty = kitties[_tokenId];
        
        genes = uint256(kitty.genes);
        birthTime = uint256(kitty.birthTime);
        mumId = uint256(kitty.mumId);
        dadId = uint256(kitty.dadId);
        generation = uint256(kitty.generation);
        owner = kittyIdToOwner[_tokenId];
    }

    function createNewGen0(uint256 genes) public onlyOwner returns(uint256) {
        require(genCntr < CREATION_LIMIT_FOR_GEN, "Limit achieved");
        genCntr++;
        uint256 kittyId = _createKitty(genes,0,0,0,msg.sender);
        return kittyId;
    }

    // **** Contract specific - Private functions
    function _createKitty(
        uint256 _genes,
        uint32 _mumId,
        uint32 _dadId,
        uint16 _generation,
        address _owner
    ) private returns (uint256 tokenId) {
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            mumId: _mumId,
            dadId: _dadId,
            generation: _generation
        });

        kitties.push(_kitty);
        uint256 newKittenId =  kitties.length - 1;

        _transfer(address(0), _owner, newKittenId);

        emit Birth(_owner, newKittenId, _genes, _mumId, _dadId);

        return newKittenId;
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        kittyIdToOwner[_tokenId] = _to;
        if(_from != address(0)) { // We do not want to decrease amount for minting
            ownershipCounter[_from]--;
            delete kittyIndexToApproved[_tokenId]; // It is very important for approval functionality
            // We do not want to have approved people (who can sell this token) when we are buying nfts
        }
        ownershipCounter[_to]++;

        emit Transfer(_from, _to, _tokenId);
    }

    function _approve(address _approved, uint256 _tokenId) private{
        kittyIndexToApproved[_tokenId] = _approved;     
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) private {
        _transfer(_from, _to, _tokenId);
        _checkERC721Support(_from, _to, _tokenId, _data);
        
    }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) private returns(bool){
        if(false == _isContract(_to)){
            return true;
        }
        else{
            bytes4 reuturnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
            return (ERC721CONF == reuturnData);
        }
    }

    function _isContract(address _to) view private returns(bool){
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0;
    }

    function _mixDna(uint256 _dadDna, uint256 _mumDna) private pure returns (uint256) {
        return (_dadDna / 100000000) | (_mumDna % 100000000);
    }
    
}