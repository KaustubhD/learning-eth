const ItemManager = artifacts.require('./ItemManager.sol');

contract('ItemManager', () => {
  it('should be able to create an item', async () => {
    const instance = await ItemManager.deployed();
    const itemName = 'abc';
    const itemPrice  = 1234;

    let result = await instance.createItem(itemName, itemPrice);
    assert.equal(result.logs[0].args._index, 0, 'Not the first item');

    result = await instance.items(0);
    assert.equal(result._id, itemName, 'The item\'s name was different');
  });
});