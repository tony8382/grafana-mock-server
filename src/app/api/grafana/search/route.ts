import { getCorsHeader } from "../../../../../utils/cors"

export async function POST(request: Request) {
  let res = [ { "text" :"user", "value": 1}, { "text" :"org", "value": 2} ]
  return new Response( JSON.stringify(res))
}
