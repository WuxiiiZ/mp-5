"use server"
// This file is to fetch the true url from the alias in collection.
import client from "@/lib/mongodb";
import {redirect} from 'next/navigation';

export default async function Page({params}:{params:{alias: string}}) {
    const db = client.db("mp-5");
    const redirection = await db.collection("urls").findOne({alias: params.alias});
    if (redirection && redirection.url){
        redirect(redirection.url);
    }
}