class PublicAct {
    static instance;
    static get Instance() {
        if (null == PublicAct.instance) {
            PublicAct.instance = new PublicAct();
        }
        return PublicAct.instance;
    }
    init(axios) {
        this.axios = axios;
    }
    // 获取每日一句内容
    async getEverySaying() {
        let res = await fetch("https://v1.hitokoto.cn/?c=e");
        if (res.status === 200) {
            let ret = await res.json();
            return ret;
        }
    }
}

export default PublicAct;