import Api from "./api";

export default {
    index () {
        return Api().get(`users`, {})
    },

    post (user) {
        return Api().post(`user`,user)
    },

    show(userId) {
        return Api().get(`users/${userId}`)
    },

    put(user,userId) {
        return Api().put(`user/${userId}`,user)
    },

    delete (userId) {
        return Api().delete(`user/${userId}`)
    }
}