const { assert } = require('chai');

const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank' , (accounts) =>{
    describe('Mock Tether Deployment',async () =>{
        it('matches name successfully', async () =>{
            let tether = await Tether.new()
            const name = await tether.name()
            assert.equal(name, "Mock Tether Token");
        })
    })
    
     describe("Reward Token", async () => {
       it("matches name successfully", async () => {
         let reward = await RWD.new();
         const name = await reward.name();
         assert.equal(name, "Reward Token");
       });
     });

})