import requests from "@/axios";


export function getCaptchaImage() {
    return requests({
        url: '/api/getCaptchaImage',
        method: 'get',
    })
}