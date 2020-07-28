// hello.js
import Vue from 'vue';
import HelloTemplate from './hello.vue';

// 使用extend方法创建vue的子类
const HelloConstructor = Vue.extend(HelloTemplate);

// 使用这个方法调用hello组件
function Hello(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      text: options
    }
  }

  // 实例化子组件，然后获取到DOM结构并挂载到body上
  const helloInstence = new HelloConstructor({data: options});
  helloInstence.vm = helloInstence.$mount();
  document.body.appendChild(helloInstence.vm.$el);
}
export default Hello;
