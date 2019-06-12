var alphaDust = function () {

    var _menuOn = false;

    function initPostHeader() {
        $('.main .post').each(function () {
            var $post = $(this);
            var $header = $post.find('.post-header.index');
            var $title = $post.find('h1.title');
            var $readMoreLink = $post.find('a.read-more');

            var toggleHoverClass = function () {
                $header.toggleClass('hover');
            };

            $title.hover(toggleHoverClass, toggleHoverClass);
            $readMoreLink.hover(toggleHoverClass, toggleHoverClass);
        });
    }

    function _menuShow () {
        $('nav a').addClass('menu-active');
        $('.menu-bg').show();
        $('.menu-item').css({opacity: 0});
        TweenLite.to('.menu-container', 1, {padding: '0 40px'});
        TweenLite.to('.menu-bg', 1, {opacity: '0.92'});
        TweenMax.staggerTo('.menu-item', 0.5, {opacity: 1}, 0.3);
        _menuOn = true;

        $('.menu-bg').hover(function () {
            $('nav a').toggleClass('menu-close-hover');
        });
    }

    function _menuHide() {
        $('nav a').removeClass('menu-active');
        TweenLite.to('.menu-bg', 0.5, {opacity: '0', onComplete: function () {
            $('.menu-bg').hide();
        }});
        TweenLite.to('.menu-container', 0.5, {padding: '0 100px'});
        $('.menu-item').css({opacity: 0});
        _menuOn = false;
    }

    function initMenu() {

        $('nav a').click(function () {
            if(_menuOn) {
                _menuHide();
            } else {
                _menuShow();
            }
        });

        $('.menu-bg').click(function (e) {
            if(_menuOn && e.target === this) {
                _menuHide();
            }
        });
    }

    function displayArchives() {
        $('.archive-post').css({opacity: 0});
        TweenMax.staggerTo('.archive-post', 0.4, {opacity: 1}, 0.15);
    }

    return {
        initPostHeader: initPostHeader,
        initMenu: initMenu,
        displayArchives: displayArchives
    };
}();


$(document).ready(function () {
    alphaDust.initPostHeader();
    alphaDust.initMenu();
    alphaDust.displayArchives();
});


//动画：太空
class Calc {

  /*
  ------------------------------------------
  | rand:float - returns random float
  |
  | min:number - minimum value
  | max:number - maximum value
  | ease:function - easing function to apply to the random value
  |
  | Get a random float between two values,
  | with the option of easing bias.
  ------------------------------------------ */
  static rand(min, max, ease) {
    if(max === undefined) {
      max = min;
      min = 0;
    }
    let random = Math.random();
    if(ease) {
      random = ease(Math.random(), 0, 1, 1);
    }
    return random * (max - min) + min;
  }

  /*
  ------------------------------------------
  | randInt:integer - returns random integer
  |
  | min:number - minimum value
  | max:number - maximum value
  | ease:function - easing function to apply to the random value
  |
  | Get a random integer between two values,
  | with the option of easing bias.
  ------------------------------------------ */
  static randInt(min, max, ease) {
    if(max === undefined) {
      max = min;
      min = 0;
    }
    let random = Math.random();
    if(ease) {
      random = ease(Math.random(), 0, 1, 1);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /*
  ------------------------------------------
  | randArr:item - returns random iem from array
  |
  | arr:array - the array to randomly pull from
  |
  | Get a random item from an array.
  ------------------------------------------ */
  static randArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /*
  ------------------------------------------
  | map:number - returns a mapped value
  |
  | val:number - input value
  | inputMin:number - minimum of input range
  | inputMax:number - maximum of input range
  | outputMin:number - minimum of output range
  | outputMax:number - maximum of output range
  |
  | Get a mapped value from and input min/max
  | to an output min/max.
  ------------------------------------------ */
  static map(val, inputMin, inputMax, outputMin, outputMax) {
    return ((outputMax - outputMin) * ((val - inputMin) / (inputMax - inputMin))) + outputMin;
  }

  /*
  ------------------------------------------
  | clamp:number - returns clamped value
  |
  | val:number - value to be clamped
  | min:number - minimum of clamped range
  | max:number - maximum of clamped range
  |
  | Clamp a value to a min/max range.
  ------------------------------------------ */
  static clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
  }

  /*
  ------------------------------------------
  | roundToUpperInterval:number - returns rounded up value
  |
  | value:number - value to be rounded
  | interval:number - interval
  |
  | Round up a value to the next highest interval.
  ------------------------------------------ */
  static roundToUpperInterval(value, interval) {
    if(value % interval === 0) {
      value += 0.0001;
    }
    return Math.ceil(value / interval) * interval;
  }

  /*
  ------------------------------------------
  | roundDownToInterval:number - returns rounded down value
  |
  | value:number - value to be rounded
  | interval:number - interval
  |
  | Round down a value to the next lowest interval.
  ------------------------------------------ */
  static roundToLowerInterval(value, interval) {
    if(value % interval === 0) {
      value -= 0.0001;
    }
    return Math.floor(value / interval) * interval;
  }

  /*
  ------------------------------------------
  | roundToNearestInterval:number - returns rounded value
  |
  | value:number - value to be rounded
  | interval:number - interval
  |
  | Round a value to the nearest interval.
  ------------------------------------------ */
  static roundToNearestInterval(value, interval) {
    return Math.round(value / interval) * interval;
  }

  /*
  ------------------------------------------
  | intersectSphere:boolean - returns if intersecting or not
  |
  | a:object - sphere 1 with radius, x, y, and z
  | b:object - sphere 2 with radius, x, y, and z
  |
  | Check if two sphere are intersecting
  | in 3D space.
  ------------------------------------------ */
  static intersectSphere(a, b) {
    let distance = Math.sqrt(
      (a.x - b.x) * (a.x - b.x) +
      (a.y - b.y) * (a.y - b.y) +
      (a.z - b.z) * (a.z - b.z)
    );
    return distance < (a.radius + b.radius);
  }

  /*
  ------------------------------------------
  | getIndexFromCoords:number - returns index
  |
  | x:number - x value (column)
  | y:number - y value (row)
  | w:number - width of grid
  |
  | Convert from grid coords to index.
  ------------------------------------------ */
  static getIndexFromCoords(x, y, w) {
    return x + (y * w);
  }

  /*
  ------------------------------------------
  | getCoordsFromIndex:object - returns coords
  |
  | i:number - index
  | w:number - width of grid
  |
  | Convert from index to grid coords.
  ------------------------------------------ */
  static getCoordsFromIndex(i, w) {
    return {
      x: i % w,
      y: Math.floor(i / w)
    }
  }

}

let canvas = document.querySelector('canvas');

let illo;
let ringGroup;
let rings = [];
let ringCount = 70;
let ringDiameter = 350;
let starGroup;
let stars = [];
let starCount = 100;
let starRange = 200;

illo = new Zdog.Illustration({
  element: canvas,
  dragRotate: true });


ringGroup = new Zdog.Group({ addTo: illo });
starGroup = new Zdog.Group({ addTo: illo });

ringGroup.render = function (ctx) {
  ctx.globalCompositeOperation = 'screen';
  Zdog.Group.prototype.render.apply(this, arguments);
};

for (let i = 0; i < ringCount; i++) {
  let p = i / (ringCount - 1);
  rings.push({
    shape: new Zdog.Ellipse({
      addTo: ringGroup,
      diameter: Math.sin(p * Zdog.TAU / 2) * ringDiameter / 2,
      translate: { z: Math.cos(p * Zdog.TAU / 2) * ringDiameter / 4 },
      rotate: { z: Calc.rand(Zdog.TAU) },
      color: `hsla(${Calc.map(p, 0, 1, 180, 360)}, 90%, 50%, 1)`,
      quarters: Calc.randInt(1, 3) }),

    spin: Calc.rand(0.001, 0.03) });

}

for (let i = 0; i < starCount; i++) {
  stars.push({
    shape: new Zdog.Ellipse({
      addTo: starGroup,
      diameter: 0,
      translate: {
        x: Calc.rand(-starRange, starRange),
        y: Calc.rand(-starRange, starRange),
        z: Calc.rand(-starRange, starRange) },

      stroke: Calc.rand(0.5, 2),
      color: `hsla(0, 0%, 100%, ${Calc.rand(0.1, 1)})` }) });


}

function animate() {
  ringGroup.rotate.y -= 0.003;
  ringGroup.rotate.x += 0.003;

  starGroup.rotate.y += 0.0005;
  starGroup.rotate.x -= 0.0007;
  starGroup.rotate.z -= 0.0009;

  for (let i = 0, len = rings.length; i < len; i++) {
    let ring = rings[i].shape;
    ring.stroke = Calc.map(Math.sin(Date.now() * 0.005 + i * 0.2), -1, 1, 1, 3);
    ring.rotate.z += rings[i].spin;
  }

  for (let i = 0, len = stars.length; i < len; i++) {
    let star = stars[i].shape;
    star.stroke = Calc.map(Math.sin(Date.now() * 0.002 + i * 0.4), -1, 1, 0.5, 2);
  }

  illo.updateRenderGraph();
  window.requestAnimationFrame(animate);
}

animate();
