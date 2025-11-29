import { processFullPacket,processIndexFullPacket,processIndexLtpPacket,processIndexQuotePacket,processLtpPacket,processQuotePacket } from "./decodeFunction.js";
export default function processByteMessage(message) {
    const dv = new DataView(message);
    let position = 0;
    let results;
    while (position < message.byteLength) {
        const type = dv.getUint8(position);
        position += 1;

        let data = null;
        let consumed = 0;

        switch (type) {
            case 64:
                data = processIndexLtpPacket(dv, position);
                consumed = 22;
                break;

            case 65:
                data = processIndexQuotePacket(dv, position);
                consumed = 42;
                break;

            case 66:
                data = processIndexFullPacket(dv, position);
                consumed = 38;
                break;

            case 61:
                data = processLtpPacket(dv, position);
                consumed = 22;
                break;

            case 62:
                data = processQuotePacket(dv, position);
                consumed = 66;
                break;

            case 63:
                data = processFullPacket(dv, position);
                consumed = 174;
                break;

            default:
                console.log("Unknown packet type:", type);
                return results;
        }
        results = data

        position += consumed;
    }
        return results;
}