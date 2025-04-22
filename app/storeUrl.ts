"use server"

import client from "@/lib/mongodb";

async function isValidUrl(url: string): Promise<boolean> {
    try{
        const checkUrl = new URL(url);
        const isHttp =  checkUrl.protocol === "http:" || checkUrl.protocol === "https:";
        if (!isHttp) {
            return false;
        }
        const response = await fetch(checkUrl);
        console.log(response);
        return response.ok;
    }
    catch{
        return false;
    }
}

export async function storeURL(url: string, alias: string){
    const db = client.db("mp-5");
    const validate = await isValidUrl(url);
    if (!validate) {
        return "invalidUrl";
    }
    const repeatAlias = await db.collection("urls").findOne({alias: alias});
    if (repeatAlias) {
        return "aliasExists";
    }
    await db.collection("urls").insertOne({alias, url});
    return "success";

}