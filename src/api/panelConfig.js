import requests from "@/axios";
import qs from 'qs'

export function getPanelConfig() {
    return requests({
        url: '/api/admin/config',
        method: 'get',
    })
}

export function getDefault() {
    return requests({
        url: '/api/admin/configDefault',
        method: 'get',
    })
}

export function updateConfig(config) {
    return requests({
        url: '/api/admin/config',
        method: 'post',
        data: qs.stringify({
            data: JSON.stringify(config)
        })
    })
}