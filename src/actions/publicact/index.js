import ActionBase from "../actbase";
import axios from "axios";
class PublicAct extends ActionBase {
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
        let res = await axios.get("https://v1.hitokoto.cn/?c=e");
        if (res.status === 200) {
            let ret = res.data;
            return ret;
        }
    }
    // 获取每日一句内容
    async gethotNews(id) {
        let res = await axios.get("https://api.vips.im/hotnews/GetTypeInfo?id="+id);
        if (res.status === 200) {
            let ret = res.data;
            return ret;
        }
    }
}

export default PublicAct;