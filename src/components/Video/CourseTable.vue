<template>
  <div>
    <h4>{{course_table.typeName}}</h4>
    <table class="am-table am-table-hover" :class="{ 'b3': videos_is_live, 'b1': !videos_is_live}">
      <thead>
        <!-- 直播表头 -->
        <tr v-if="videos_is_live">
          <td class="small">开播日期</td>
          <td class="small">开播时间</td>
          <td>课程名称</td>
        </tr>
        <!-- 录像表头 -->
        <tr v-else>
          <td>课程名称</td>
          <!-- <td class="small">状态</td> -->
          <!-- <td class="small">观看进度</td> -->
          <td class="wide">视频时长</td>
        </tr>
        </tr>
      </thead>
      <!-- 直播内容格式 -->
      <tbody v-if="videos_is_live">
        <tr v-for="video in course_table.videos" :data-id="video.videoId">
          <td>{{video.startTime|getDateFromTimestr}}</td>
          <td>{{video.startTime|getTimeFromTimestr}}</td>
          <td>{{video.videoName}}</td>
        </tr>
      </tbody>
      <!-- 录像内容格式 -->
      <tbody v-else>
        <tr v-for="video in course_table.videos" :data-video_id="video.videoId">
          <td>{{video.videoName}}</td>
          <!-- <td>未观看</td> -->
          <!-- <td class="grey">00:00/{{video.duration | durationTimeFormat}}</td> -->
          <td class="wide">{{video.duration | durationTimeFormat}}</td>
        </tr>
        <!-- <tr>
          <td>我是看完的</td>
          <td class="grey">已观看</td>
          <td class="grey">59:55/60:00</td>
        </tr>
        <tr>
          <td>我是没看过的</td>
          <td class="grey">已观看</td>
          <td>43:55/60:00</td>
        </tr>
        <tr>
          <td>我是没看过的</td>
          <td class="grey">已观看</td>
          <td>43:55/60:00</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    name: 'course_table_panel',
    props: ['course_table'],
    computed: {
      videos_is_live: function () {
        return this.course_table.typeCode == '08'? true : false
      }
    },
    filters: {
      getDateFromTimestr(value) {
        var temparr = value.split("T")[0].split("-")
        return temparr[1]+'月'+temparr[2]+'日'
      },
      getTimeFromTimestr(value) {
        return value.split("T")[1]
      },
      durationTimeFormat(value) {
        var temp=[];
        temp = value>=3600?[Math.floor(value/3600),Math.floor(value%3600/60),value%60]:[Math.floor(value/60),value%60]
        for(var i in temp){
          temp[i]= temp[i]<10 ? '0'+temp[i] : temp[i];
        }
        return temp.join(":");
      }
    }
  }

</script>
