export function processLtpPacket(dvu , position) {
	return{
		last_trade_price: Number((dvu.getFloat32(position, true)).toFixed(2)),
        last_trade_time: dvu.getInt32(position + 4, true),
        securityID: dvu.getInt32(position + 8, true),
        traded: dvu.getInt8(position + 12, true),
        mode: dvu.getInt8(position + 13, true),
        changeAbsolute: dvu.getFloat32(position + 14, true),
        changePercent: dvu.getFloat32(position + 18, true)
    };
}
export function processIndexLtpPacket(dvu,position) {
		console.log("last_trade_price: " + dvu.getFloat32(position, true));
		console.log("last_update_time: " + dvu.getInt32(position + 4, true));
		console.log("security id: " + dvu.getInt32(position + 8, true));
		console.log("traded: " + dvu.getInt8(position + 12, true));
		console.log("Mode: " + dvu.getInt8(position + 13, true));
		console.log("changeAbsolute: " + dvu.getFloat32(position + 14, true));
		console.log("changePercent: " + dvu.getFloat32(position + 18, true));
		position += 22;
}
export function processQuotePacket(dvu,position) {
		console.log("last_traded_price: " + dvu.getFloat32(position, true));
		console.log("Last_trade_time: " + dvu.getInt32(position + 4, true));
		console.log("security id: " + dvu.getInt32(position + 8, true));
		console.log("traded: " + dvu.getInt8(position + 12, true));
		console.log("Mode: " + dvu.getInt8(position + 13, true));
		console.log("last_traded_quantity " + dvu.getInt32(position + 14, true));
		console.log("average_traded_price: " + dvu.getFloat32(position + 18, true));
		console.log("volume: " + dvu.getInt32(position + 22, true));
		console.log("total_buy_quantity: " + dvu.getInt32(position + 26, true));
		console.log("total_sell_quantity: " + dvu.getInt32(position + 30, true));
		console.log("open: " + dvu.getFloat32(position + 34, true));
		console.log("close: " + dvu.getFloat32(position + 38, true));
		console.log("high: " + dvu.getFloat32(position + 42, true));
		console.log("low: " + dvu.getFloat32(position + 46, true));
		console.log("change_percent: " + dvu.getFloat32(position + 50, true));
		console.log("change_absolute: " + dvu.getFloat32(position + 54, true));
		console.log("52_week_high: " + dvu.getFloat32(position + 58, true));
		console.log("52_week_low: " + dvu.getFloat32(position + 62, true));
		position += 66;
}
export function processIndexQuotePacket(dvu,position) {
		console.log("last_trade_price: " + dvu.getFloat32(position, true));
		console.log("security id: " + dvu.getInt32(position + 4, true));
		console.log("traded: " + dvu.getInt8(position + 8, true));
		console.log("Mode: " + dvu.getInt8(position + 9, true));
		console.log("open " + dvu.getFloat32(position + 10, true));
		console.log("close: " + dvu.getFloat32(position + 14, true));
		console.log("high: " + dvu.getFloat32(position + 18, true));
		console.log("low: " + dvu.getFloat32(position + 22, true));
		console.log("change_percent: " + dvu.getFloat32(position + 26, true));
		console.log("change_absolute: " + dvu.getFloat32(position + 30, true));
		console.log("52_week_high: " + dvu.getFloat32(position + 34, true));
		console.log("52_week_low: " + dvu.getFloat32(position + 38, true));
		position += 42;
}
export function processFullPacket(dvu,position) {
		depthPosition = position;
		for (let i = 0; i < 5; i++) {
			console.log("DEPTH PACKET  #" + (i + 1));
			console.log("buy_quantity: " + dvu.getInt32(depthPosition, true));
			console.log("sell_quantity: " + dvu.getInt32(depthPosition + 4, true));
			console.log("buy_order: " + dvu.getInt16(depthPosition + 8, true));
			console.log("sell_order: " + dvu.getInt16(depthPosition + 10, true));
			console.log("buy_price: " + dvu.getFloat32(depthPosition + 12, true));
			console.log("sell_price: " + dvu.getFloat32(depthPosition + 16, true));
			console.log("\n");
			depthPosition += 20;
		}
		position += 100;
		console.log("last_traded_price: " + dvu.getFloat32(position, true));
		console.log("last_trade_time: " + dvu.getInt32(position + 4, true));
		console.log("security id: " + dvu.getInt32(position + 8, true));
		console.log("traded: " + dvu.getInt8(position + 12, true));
		console.log("Mode: " + dvu.getInt8(position + 13, true));
		console.log("last_traded_quantity " + dvu.getInt32(position + 14, true));
		console.log("average_traded_price: " + dvu.getFloat32(position + 18, true));
		console.log("volume: " + dvu.getInt32(position + 22, true));
		console.log("total_buy_quantity: " + dvu.getInt32(position + 26, true));
		console.log("total_sell_quantity: " + dvu.getInt32(position + 30, true));
		console.log("open: " + dvu.getFloat32(position + 34, true));
		console.log("close: " + dvu.getFloat32(position + 38, true));
		console.log("high: " + dvu.getFloat32(position + 42, true));
		console.log("low: " + dvu.getFloat32(position + 46, true));
		console.log("change_percent: " + dvu.getFloat32(position + 50, true));
		console.log("change_absolute: " + dvu.getFloat32(position + 54, true));
		console.log("52_week_high: " + dvu.getFloat32(position + 58, true));
		console.log("52_week_low: " + dvu.getFloat32(position + 62, true));
		console.log("oi: " + dvu.getInt32(position + 66, true));
		console.log("change_oi: " + dvu.getInt32(position + 70, true));
		position += 74;
}
export function processIndexFullPacket(dvu,position) {
		console.log("last_trade_price: " + dvu.getFloat32(position, true));
		console.log("security id: " + dvu.getInt32(position + 4, true));
		console.log("traded: " + dvu.getInt8(position + 8, true));
		console.log("Mode: " + dvu.getInt8(position + 9, true));
		console.log("open " + dvu.getFloat32(position + 10, true));
		console.log("close: " + dvu.getFloat32(position + 14, true));
		console.log("high: " + dvu.getFloat32(position + 18, true));
		console.log("low: " + dvu.getFloat32(position + 22, true));
		console.log("change_percent: " + dvu.getFloat32(position + 26, true));
		console.log("change_absolute: " + dvu.getFloat32(position + 30, true));
		console.log("last_update_time: " + dvu.getInt32(position + 34, true));
		position += 38;
}
