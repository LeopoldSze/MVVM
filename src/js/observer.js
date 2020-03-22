function Observer(obj) {
  this.obj = obj;
  this.walk(obj);
}

Observer.prototype = {
  walk: function(obj) {
    const self = this;
    Object.keys(obj).forEach(key => {
        self.defineReactive(obj, key, obj[key]);
    });
  },
  defineReactive: function(obj, key, val) {
    const dep = new Dep(); // 实例化消息订阅器dep
    const childObj = observe(val); // 实例化数据监听器childObj
    Object.defineProperty(data, key, {
      enumerable: true, // 枚举属性
      configurable: true, // 删除属性
      get: function getter() {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set: function setter(newVal) {
        if (newVal === val) {
            return;
        }
        val = newVal;
        dep.notify();
      }
    });
  }
};

// 实例化数据监听器
function observe(value) {
  if (!value || typeof value !== 'object') {
    return;
  }
  return new Observer(value);
};

function Dep () {
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    console.log('属性变化通知 Watcher 执行更新视图函数');
    this.subs.forEach(sub => {
      sub.update();
    });
  }
};
Dep.target = null;
