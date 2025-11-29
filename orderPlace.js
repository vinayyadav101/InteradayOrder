import axios from 'axios';
import  logger  from "./logFile.js";
import { websoket } from "./webSoket.js";
const dataSchema = {
    "source": "N",
    "txn_type": "B",
    "exchange": "NSE",
    "segment": "E",
    "product": "I",
    "security_id": "",
    "quantity": "",
    "validity": "DAY",
    "order_type": "MKT",
    "price": 0,
    "order_ltp": 0.0
}

let targets = {
    "profit_value": 4,
    "stoploss_value": 2,
}
async function Postion(security_id , exchange ,product) {
    try {
        const response = await axios.get(`https://developer.paytmmoney.com/orders/v1/position-details?security_id=${security_id}&product=${product}&exchange=${exchange}`,{headers:{'x-jwt-token':process.env.ACCESS_TOKEN}})
            if (response.status === 200) {                
                return response?.data?.data[0]?.avg_traded_price;
            }
    } catch (error) {
        logger.error(error)
    }
}
export async function placeOrder(data) {
    
    try {
        const url = 'https://developer.paytmmoney.com/orders/v1/place/regular';
        const headers = {
            'x-jwt-token':process.env.ACCESS_TOKEN,
            'Content-Type':'application/json'
        }
        const response = await axios.post(url , data , {headers})
            
            if (response.status === 200) {
                logger.info({
                    orderNo:response?.data?.data[0]?.order_no,
                    ...data
                });
                console.log(response.data);
                  return 200;
            }     
    
    } catch (error) {
        console.log(error); 
    }

}

export async function Interaday(exchange , security_id , target , quantity) {
    let data;
        try {
            const last_trade_Price = await axios.get(`https://developer.paytmmoney.com/data/v1/price/live?mode=LTP&pref=${exchange}:${security_id}:EQUITY`,{headers:{"x-jwt-token":process.env.ACCESS_TOKEN}});
                    
                if (last_trade_Price.status !== 200) {
                    return;
                }
                data = {
                    ...dataSchema , 
                    security_id ,
                    exchange ,
                    quantity,
                    order_ltp: last_trade_Price?.data?.data[0]?.last_price ,
                }
            const order = await placeOrder(data)
                if (order !== 200) return ;
            const Cureentpostion  = await Postion(data.security_id , data.exchange , data.product)
                console.log(Cureentpostion);
                
                if(Cureentpostion){
                    Object.assign(targets , {
                        profit_value: Number((Cureentpostion * ((100 + (target))/100)).toFixed(2)),
                        stoploss_value: Number((Cureentpostion * ((100 - ((target * 40)/100))/100)).toFixed(2))
                    })
                }

                websoket(data , targets , placeOrder)
        } catch (error) {
            logger.error(error)
        }
}
