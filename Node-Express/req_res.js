// ===================================================================
//  res.status(200).send(body)
// ===================================================================


import fetch from 'node-fetch'
import request from 'request';
import http from "http"


export const advanceSearch = (req, res, next) =>{
    console.log("getting new data...")
    let username = '7defcf60-fc41-4010-9607-f1c866874e3a';
    let password = '';
    var auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");
    var url = "https://api.company-information.service.gov.uk/advanced-search/companies?incorporated_from=2022-07-21&incorporated_to=2022-07-21&size=10";

    request.get({
        url : url,
        headers : {
            "Authorization" : auth,
            "Content-Type": "application/json"
        }
    }, function(error, response, body) {
        console.log('body : ', body );

        //sending json data using send
        res.status(200).send(body)

    });


}