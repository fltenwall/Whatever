export default {
    methods: {
        showPreview(modelid, productid) {
            this.$router.push({ path: 'preview', query: { modelid: modelid, productid: productid } })
        }
    }
}