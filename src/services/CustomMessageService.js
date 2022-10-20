import Api from "./api";

export default {
    index () {
        return Api().get(`customMessages`, {})
    },

    post (customMessage) {
        return Api().post(`customMessage`,customMessage)
    },

    show(customMessageId) {
        return Api().get(`customMessages/${customMessageId}`)
    },

    put(customMessage,customMessageId) {
        return Api().put(`customMessage/${customMessageId}`,customMessage)
    },

    delete (customMessageId) {
        return Api().delete(`customMessage/${customMessageId}`)
    }
}