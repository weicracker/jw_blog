import React from "react"
import { graphql } from "gatsby"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import SEO from "../components/seo"
import HotTabPanel from "../components/HotTabPanel"
import Layout from "../components/layout";
/*
https://www.printf520.com/hot.html 
var alen = $("#myHotBar").find('a');
var arr = []
for(var i=0;i<alen.length;i++){
arr.push({
    name:alen.eq(i).text(),
    id:alen.eq(i).attr('type')
})
}
console.log(JSON.stringify(arr));
*/

class News extends React.Component {
  
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const hotList = [{ "name": "知乎", "id": "1" }, { "name": "虎扑", "id": "2" }, { "name": "V2EX", "id": "59" }, { "name": "微博", "id": "58" }, { "name": "微信", "id": "11" }, { "name": "知乎日报", "id": "7" }, { "name": "天涯", "id": "6" }, { "name": "水木社区", "id": "9" }, { "name": "GitHub", "id": "85" }, { "name": "煎蛋", "id": "111" }, { "name": "IT之家", "id": "112" }, { "name": "涨姿势", "id": "113" }, { "name": "网易新闻", "id": "10" }, { "name": "抽屉", "id": "110" }, { "name": "豆瓣", "id": "57" }, { "name": "Segmentfault", "id": "60" }, { "name": "36Kr", "id": "12" }, { "name": "贴吧", "id": "56" }, { "name": "黑客派", "id": "62" }, { "name": "百度热搜", "id": "83" }, { "name": "好奇心日报", "id": "61" }, { "name": "猫扑", "id": "108" }, { "name": "果壳", "id": "86" }, { "name": "NGA", "id": "106" }, { "name": "Chiphell", "id": "109" }, { "name": "虎嗅", "id": "8" }, { "name": "凯迪", "id": "105" }, { "name": "Bilibili", "id": "115" }, { "name": "开源中国", "id": "114" }, { "name": "张大妈", "id": "117" }, { "name": "少数派", "id": "116" }, { "name": "CSDN", "id": "104" }, { "name": "媳妇当车模", "id": "118" }, { "name": "腾讯科技", "id": "127" }, { "name": "界面新闻", "id": "128" }, { "name": "澎湃新闻", "id": "120" }, { "name": "雷科技", "id": "119" }, { "name": "吾爱破解", "id": "125" }, { "name": "观察者", "id": "123" }, { "name": "反馈建议", "id": "101" }, { "name": "CbnData", "id": "124" }, { "name": "篝火", "id": "122" }, { "name": "亿欧", "id": "121" }, { "name": "凤凰网", "id": "126" }, { "name": "机核", "id": "129" }, { "name": "马蜂窝", "id": "130" }]
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="热榜" />
        <Tabs style={{marginTop:20}}>
          <TabList>
            {hotList.map((val, idx) => {
              return <Tab style={{fontSize:14}} key={idx}>{val.name}</Tab>
            })}

          </TabList>
          {hotList.map((val, idx) => {
            return <TabPanel key={idx}>
              <HotTabPanel title={val.name} id={val.id} />
            </TabPanel>
          })}
        </Tabs>
      </Layout>
    )
  }
}
export default News;
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
