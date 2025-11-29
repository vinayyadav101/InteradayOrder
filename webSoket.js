import { WebSocket } from "ws";
import processByteMessage from "./process.js";;
export function websoket(Orderdata , targets,cb){
    
    var socket = new WebSocket(`wss://developer-ws.paytmmoney.com/broadcast/user/v1/data?x_jwt_token=${process.env.PUBLIC_ACCESS_TOKEN}`);
socket.addEventListener('open', function () {
			if (socket.readyState === socket.OPEN) {
				socket.send(JSON.stringify(
					[
					{
						"actionType": "ADD",
						"modeType": "LTP",
						"scripType": "EQUITY",
						"exchangeType": Orderdata.exchange,
						"scripId": Orderdata.security_id
					}
					]
				));
			}
})
 
		
        socket.addEventListener('error', function (event) {
            console.log("error",event.error);
        })
        socket.addEventListener('message',async function (message){
            try {
                const data = message.data;
                
                if (Buffer.isBuffer(data)) {
                    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
                    const decode = processByteMessage(arrayBuffer);
                    const ltp  = decode.last_trade_price

                    console.table({
                                    "Current_price":ltp,
                                    ...targets
                                });

                    if (ltp >= targets.profit_value) {
                        const res = await cb({...Orderdata , txn_type:"S" , order_ltp:ltp })
                            console.log(res);
                                
                        if (res === 200) {
                                socket.close()
                                console.log({
                                            ...targets,
                                            websoket:"user disconected",
                                            HitTraget:"profit"
                                        })
                                        return;
                                };
                            }
                    
                    if (ltp <= targets.stoploss_value) {
                        const res = await cb({...Orderdata , txn_type:"S" , order_ltp:ltp })
                            if (res === 200) {
                                socket.close()
                                console.log(
                                    {
                                            ...targets,
                                            websoket:"user disconected",
                                            HitTraget:"stoploss"
                                        }
                                );
                                return;
                                
                                }
                            }
                } else {
                    console.log("Message: " + data);
                }
            } catch (e) {
                        console.log("Error: " + e);
                    }
        })
    }
