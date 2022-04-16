import requests from "@/axios";

export function getInfoCount() {
    return requests({
        url: '/api/infoCount',
        method: 'get',
    })
}

export function getChaCountByType() {
    return requests({
        url: '/api/chaOfTypeCount',
        method: 'get',
    })
}

export function getUserRank() {
    return requests({
        url: '/api/userRank',
        method: 'get',
    })
}

export function getUserRankView(pageSize, pageNum) {
    return requests({
        url: `/api/userRank/${pageSize}/${pageNum}`,
        method: 'get',
    })
}