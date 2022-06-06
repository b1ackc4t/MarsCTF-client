import requests from "@/axios";

/**
 * 上传文件
 * @param fileObj
 * @returns {AxiosPromise}
 */
export function upload(fileObj) {
    let form = new FormData()
    form.append("file", fileObj)
    return requests({
        url: '/api/admin/uploadCTFFile',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:form
    })
}

export function removeFile(id) {
    let form = new FormData()
    form.append("id", id)
    return requests({
        url: '/api/admin/removeCTFFile',
        method: 'post',
        data: form
    })
}

export function download(id) {
    // window.open(`${server}/api/user/downloadCTFFile/${id}`)
    window.location.href = `${requests.defaults.baseURL}/api/user/downloadCTFFile/${id}`
}

export function uploadImageForWP(fileObj) {
    let form = new FormData()
    form.append("file", fileObj)
    form.append("wid", 99999999)
    return requests({
        url: '/api/user/writeup/uploadImage',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:form
    })
}

export function uploadImageForLearn(fileObj) {
    let form = new FormData()
    form.append("file", fileObj)
    form.append("lid", 99999999)
    return requests({
        url: '/api/admin/learning/uploadImage',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:form
    })
}

export function uploadImageForNotice(fileObj) {
    let form = new FormData()
    form.append("file", fileObj)
    form.append("nid", 99999999)
    return requests({
        url: '/api/admin/notice/uploadImage',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:form
    })
}

