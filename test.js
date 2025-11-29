let dataSchema = {
    "source": "N",
    "txn_type": "B",
    "exchange": "NSE",
    "segment": "E",
    "product": "I",
    "security_id": "2792",
    "quantity": "",
    "validity": "DAY",
    "order_type": "LMT",
    "price": 0.34,
    "order_ltp": 0.0
}

function changevalue(exchange , security_id) {
    const data = {...dataSchema , exchange , security_id}
    console.log(data);
    
}

changevalue("hel","2");
