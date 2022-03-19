import Api from "./api";

export default {
    index () {
        return Api().get(`roles`, {})
    },

    post (role) {
        return Api().post(`role`,role)
    },

    show(roleId) {
        return Api().get(`roles/${roleId}`)
    },

    put(role,roleId) {
        return Api().put(`role/${roleId}`,role)
    },

    delete (roleId) {
        return Api().delete(`role/${roleId}`)
    }
}