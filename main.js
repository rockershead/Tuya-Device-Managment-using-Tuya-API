
const {get_access_token}=require("./get_access_token")
const {get_total_energy}=require("./get_total_energy")
const{get_electric_data}=require("./get_electric_data")



const httpMethod='GET'
const device_id=""

const main=async function(){


    const access_token=await get_access_token("/v1.0/token?grant_type=1","GET")
    console.log(access_token)
    const energy_data=await get_total_energy(access_token,device_id)
    const electric_data=await get_electric_data(access_token,device_id)
    
    console.log(energy_data)
    console.log(electric_data)


}


main()


//module.exports={execute};

