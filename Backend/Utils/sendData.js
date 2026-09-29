export default function sendData(res,code,type,data){
    res.statusCode = code;
    res.setHeader("Content-Type",type);
    res.end(JSON.stringify(data));
}