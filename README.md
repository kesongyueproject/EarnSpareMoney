# EarnSpareMoney
挣闲钱项目

## 重要说明

+ 虽然我在github上给每个人都开了写的权限，但大家务必**先fork**到自己本地仓库，在自己本地仓库修改代码后再**push**到自己仓库，然后再**pull request**推到组织仓库，我再合并，这样能减少**冲突**。前端代码下除了app.*等几个文件，不要修改其它文件，特别是**pages**下其他人写的文件。自己的页面在pages文件夹下创建目录增加代码文件。还有就是**push**到自己仓库之前更新**fork**，也即重新fork。

### 其它说明

+ front-end 前端代码文件夹
+ back-end 后端代码文件夹



+ front-end文件夹下目录简解：

  + pages：组员写的关于各页面的代码，根据自己的需要增加目录和代码。不要修改该目录下其他人写的代码

  + style：从微信提供的原生控件样式库复制过来，已配置好，如需要，使用方法如下：

    ```xml
    <view class="weui-cells">
        <view class="weui-cell">
            <view class="weui-cell__bd">名称</view>
            <view class="weui-cell__ft">abc</view>
        </view>
    </view>
    ```

    通过`class`使用提供的css样式就行。

    原生控件库链接：https://github.com/Tencent/weui-wxss/，大家都下下来看看那个控件样式合适自己的，能用原生尽量用原生呗，省事又好用。

  + utils：emmm该目录我也不知道是干嘛的

  + app.*几个文件是全局配置的吧。

### 前端兄弟的工作

+ 主页面的Tab框架我写的了，自己在pages目录下创建自己页面的目录，把相关的代码复制进去或拖进去，再在app.json文件修改一下tabbar里面的属性就行，下面代码中第三个路径就是我的页面，其他页面（找活动，发布活动，我的）自己要格式修改下即可：

  ```json
  "tabBar": {
      "list": [
        {
          "pagePath": "pages/myActivity/myActivity",
          "iconPath": "pages/image/chat.png",
          "selectedIconPath": "pages/image/chat.png",
          "text": "找活动"
        },
        {
          "pagePath": "pages/myActivity/myActivity",
          "iconPath": "pages/image/contact.png",
          "selectedIconPath": "pages/image/contact.png",
          "text": "发布活动"
        },
        {
          "pagePath": "pages/myActivity/myActivity",  
          "iconPath": "pages/image/contact.png",
          "selectedIconPath": "pages/image/contact.png",
          "text": "我的活动"
        },
        {
          "pagePath":"pages/myActivity/myActivity",
          "iconPath": "pages/image/contact.png",
          "selectedIconPath": "pages/image/contact.png",
          "text": "我的"
        }
      ]
    }
  ```


