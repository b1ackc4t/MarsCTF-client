import requests from "@/axios";

export function getAllType() {
    return requests({
        url: '/api/chaType',
        method: 'get'
    })
}