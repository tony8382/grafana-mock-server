export const getCorsHeader = ():Headers =>{
    let header = new Headers()
    header.set("Access-Control-Allow-Headers","accept, content-type")
    header.set("Access-Control-Allow-Methods","POST, OPTIONS")
    header.set("Access-Control-Allow-Origin","*")
    
    return header
}