import Api from "./api";

export default {
    index () {
        return Api().get(`facilities`, {})
    },

    show(facilityId) {
        return Api().get(`facilities/${facilityId}`)
    },
}