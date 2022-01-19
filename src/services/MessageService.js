import Api from "./api";

export default {
    index () {
        return Api().get(`messages`, {})
    },

    post (message) {
        return Api().post(`message`,message)
    },

    show(messageId) {
        return Api().get(`messages/${messageId}`)
    },

    put(message,messageId) {
        return Api().put(`message/${messageId}`,message)
    },

    delete (messageId) {
        return Api().delete(`message/${messageId}`)
    }
}