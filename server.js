import { CronJob } from "cron";
import { Interaday } from "./orderPlace.js";
import 'dotenv/config'


const jobFunction = ()=> Interaday("NSE","1164",1,"20") // value: "NSE"(exchange),"2795"(scriptid),1(traget in number),"1"(Quentity)

const job = new CronJob( '18 9 * * 1-5' , jobFunction)

job.start()


