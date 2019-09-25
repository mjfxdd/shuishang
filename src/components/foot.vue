<template>
  <div class="copyright">
    <div class="copyright_c">
      <div class="copyright_head">
        <div class="copyright_L">
          <p>
            <img src="../assets/logoC.jpg" width="200" alt="">
          </p>
          <span>
			<em>服务时间：</em>
			<em>周一至周日  9:00-18:00</em>
		</span>
          <span>
			<em>联系电话：</em>
			<strong>13805155660</strong>
		</span>
          <!--<span>-->
			<!--<em>客服QQ：</em>-->
			<!--<strong>1000266</strong>-->
		<!--</span>-->
        </div>
        <div class="copyright_C">
          <div class="copyright_C_list">
            <p>关于我们</p>
            <div class="about">
              <a href="#">公司简介</a>
            </div>
            <div class="about">
              <a href="#">知识产权</a>
            </div>
            <div class="about">
              <a href="#">联系我们</a>
            </div>
          </div>
          <div class="copyright_C_list">
            <p>产品服务</p>
            <div class="about">
              <a href="#">赛事服务</a>
              <a href="#">赛事服务</a>
            </div>
            <div class="about">
              <a href="#">赛事服务</a>
              <a href="#">赛事服务</a>
            </div>
            <div class="about">
              <a href="#">赛事服务</a>
              <a href="#">赛事服务</a>
            </div>
          </div>
          <div class="copyright_C_list">
            <p>合作服务</p>
            <div class="about">
              <a href="#">合作服务</a>
              <a href="#">合作服务</a>
            </div>
            <div class="about">
              <a href="#">合作服务</a>
              <a href="#">合作服务</a>
            </div>
            <div class="about">
              <a href="#">合作服务</a>
            </div>
          </div>
        </div>
        <div class="copyright_R">
          <!--<span><img src=""  /></span>-->
          <!--<p>扫描关注微信公众号</p>-->
        </div>
      </div>
      <div class="copyright_bottom">
        <span>苏ICP备19052529号   </span>
        <p>水尚为您带去专业服务的团队</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .copyright {
    padding-top: 79px;
    border-top: 1px solid #ededed;
  }
  .copyright_c {
    height: 313px;
    width: 1200px;
    margin: 0 auto;
  }
  .copyright_head {
    height: 247px;
    overflow: hidden;
    border-bottom: 1px solid #ededed;
  }
  .copyright_L {
    float: left;
    width: 406px;
  }
  .copyright_L p {
    display: block;
    width: 381px;
    height: 48px;
    margin-bottom: 26px;
  }
  .copyright_L span {
    display: block;
    overflow: hidden;
    margin-bottom: 4px;
  }
  .copyright_L span em {
    display: block;
    float: left;
    font-size: 14px;
    color: #888;
    line-height: 30px;
  }
  .copyright_L span strong {
    display: block;
    float: left;
    font-size: 24px;
    color: #f90;
    line-height: 30px;
  }
  .copyright_L span a {
    display: block;
    float: left;
    width: 70px;
    height: 30px;
    border-radius: 3px;
    overflow: hidden;
    /*background: url(../images/QQ.png) #03d3ff no-repeat 11px center;*/
    padding-left: 35px;
    font-size: 14px;
    color: #FFF;
    line-height: 30px;
    margin-right: 10px
  }
  .copyright_L span:last-child {
    padding-top: 10px;
  }
  .copyright_C {
    float: left;
    overflow: hidden;
  }
  .copyright_C_list {
    float: left;
    padding-top: 24px;
  }
  .copyright_C_list p {
    display: block;
    font-size: 18px;
    color: #333;
    padding-bottom: 28px;
  }
  .about {
    overflow: hidden;
    margin-bottom: 22px;
  }
  .about a {
    display: block;
    font-size: 12px;
    color: #666;
    float: left;
    margin-right: 24px;
  }
  .about a:hover {
    color: #3fc7ff;
  }
  .copyright_C_list:nth-child(2) {
    margin-left: 114px;
    margin-right: 46px;
  }
  .copyright_R {
    float: right;
    width: 150px;
  }
  .copyright_R span {
    display: block;
    width: 122px;
    height: 122px;
    border: 1px solid #ededed;
    padding: 13px;
  }
  .copyright_R span img {
    width: 100%
  }
  .copyright_R p {
    display: block;
    font-size: 12px;
    color: #999;
    text-align: center;
    padding-top: 18px;
  }
  .copyright_bottom {
    height: 65px;
    overflow: hidden;
  }
  .copyright_bottom span {
    display: block;
    line-height: 65px;
    font-size: 12px;
    color: #a9a9a9;
    float: left;
  }
  .copyright_bottom p {
    display: block;
    line-height: 65px;
    font-size: 12px;
    color: #a9a9a9;
    float: right;
  }
</style>
