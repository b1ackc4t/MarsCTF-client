import requests from "@/axios";
import {server} from "@/api/config";

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
    window.location.href = `${server}/api/user/downloadCTFFile/${id}`
}