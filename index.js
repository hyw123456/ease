/**
 * 椭圆方程式
 * @constructor
 */
class Radio {
  constructor(a, b, offsetX, offsetY, type = 'bot') {
    this.a = a;
    this.b = b;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.type = type;
  }

  getNum(x) {
    return Number(x.toFixed(8))
  }

  /**
   * (y - offsetY)² = a² * b² - b² * (x - offsetX)²
   *                  ————————————————————————————
   *                              a²
   *
   * @param x
   * @returns {*}
   */
  getY(x) {
    let r = Math.sqrt((this.getNum(Math.pow(this.a, 2) * Math.pow(this.b, 2)) - this.getNum(Math.pow(this.b, 2) * Math.pow(x - this.offsetX, 2))) / this.getNum(Math.pow(this.a, 2)));
    if (this.type === 'bot') {
      r = -r;
    }
    return r + this.offsetY;
  }
}

let Bounce = new Radio(0.4 / 2, 0.15, 0.6, 1);
let Bounce2 = new Radio(0.2 / 2 / 3 * 2, 0.15 / 3, 0.866666666, 1);
let Bounce3 = new Radio(0.2 / 2 / 3, 0.15 / 3 / 2, 0.966666666, 1);

export const EasingFunctions = {
  // 动画以相同的速度开始和结束
  linear: function (t) {
    return t
  },
  // 低速开始  高速结束
  easeIn: function (t) {
    return t * t
  },
  // 高速开始  低速结束
  easeOut: function (t) {
    return t * (2 - t)
  },
  // 低速开始 低速结束
  easeInOut: function (t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  },
  // 低速开始   高速结束  第二级
  easeInCubic: function (t) {
    return t * t * t
  },
  // 高速开始  低速结束  第二级
  easeOutCubic: function (t) {
    return (--t) * t * t + 1
  },
  // 低速开始 低速结束   第二级
  easeInOutCubic: function (t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },
  // 低速开始   高速结束  第三级
  easeInQuart: function (t) {
    return t * t * t * t
  },
  // 高速开始  低速结束  第三级
  easeOutQuart: function (t) {
    return 1 - (--t) * t * t * t
  },
  // 低速开始 低速结束  第三级
  easeInOutQuart: function (t) {
    return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
  },
  // 低速开始   高速结束  第四级
  easeInQuint: function (t) {
    return t * t * t * t * t
  },
  // 高速开始  低速结束  第四级
  easeOutQuint: function (t) {
    return 1 + (--t) * t * t * t * t
  },
  // 低速开始 低速结束  第四级
  easeInOutQuint: function (t) {
    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
  },
  // 触底反弹
  easeOutBounce: function (t) {
    if (t <= 0.4) {
      return t * 2.5 * t * 2.5;
    } else if (t <= 0.8) {
      // 椭圆
      /**
       *  (x-0.6)²   +   (y-1)²   = 1
       *  0.2²            0.15²
       */
      return Bounce.getY(t);
    } else if (t <= 0.93333333) {
      return Bounce2.getY(t);
    } else {
      return Bounce3.getY(t);
    }
  }
}

