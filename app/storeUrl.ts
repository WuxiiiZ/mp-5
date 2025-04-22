"use server"

import client from "@/lib/mongodb";

function isValidUrl(url: string): boolean {
    try{
        const checkUrl = new URL(url);
        return checkUrl.protocol === "http:" || checkUrl.protocol === "https:";
    }
    catch{
        return false;
    }
}

export async function storeURL(url: string, alias: string){
    const db = client.db("mp-5");
    if (!isValidUrl(url)){
        return "invalidUrl";
    }
    const repeatAlias = await db.collection("urls").findOne({alias: alias});
    if (repeatAlias) {
        return "aliasExists";
    }
    await db.collection("urls").insertOne({alias, url});
    return "success";

}
