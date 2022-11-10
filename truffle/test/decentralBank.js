const { assert } = require('chai');

const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank' , (accounts) =>{
    let tether,rwd

    before(async () =>{
        tether = await Tether.new()
        rwd = await RWD.new()
    })
    describe('Mock Tether Deployment',async () =>{
        it('matches name successfully', async () =>{
            let tether = await Tether.new()
            const name = await tether.name()
            assert.equal(name, "Mock Tether Token");
        })
    })
    
     describe("Reward Token", async () => {
       it("matches name successfully", async () => {
        
         const name = await rwd.name();
         assert.equal(name, "Reward Token");
       });
     });

})