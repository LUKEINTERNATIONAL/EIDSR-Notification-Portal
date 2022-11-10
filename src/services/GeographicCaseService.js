import Api from "./api";

export default {
    index () {
        return Api().get(`GeographicCases`, {})
    }
}