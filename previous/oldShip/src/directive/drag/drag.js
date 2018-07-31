export default{
  bind(el, binding, vnode) {
    const dialogHeaderEl = el.querySelector('.drag-title-el');
    dialogHeaderEl.style.cssText += ';cursor:move;';
    const dragDom = el
    var mouseAndEle = {
      x: 0,
      y: 0,
      ex: 0,
      ey: 0
  };
  dialogHeaderEl.onmousedown = function (event) {
      mouseAndEle.x = event.clientX;
      mouseAndEle.y = event.clientY;
      mouseAndEle.ex = el.offsetLeft + document.documentElement.scrollLeft;
      mouseAndEle.ey = el.offsetTop + document.documentElement.scrollTop;
      /*mouseAndEle.ey = el.offsetTop;
      mouseAndEle.ex = el.offsetLeft;*/
      document.onmousemove = function (event) {
          var newMouseAndEle = {
              newX: 0,
              newY: 0,
          };
          newMouseAndEle.newX = event.clientX;
          newMouseAndEle.newY = event.clientY;
          var x = mouseAndEle.ex + (newMouseAndEle.newX - mouseAndEle.x);
          var y = mouseAndEle.ey + (newMouseAndEle.newY - mouseAndEle.y);

          // dragDom.style.left = x + 'px';
          // dragDom.style.top = y + 'px';
          // dragDom.style.bottom = 'auto';
          dragDom.style.cssText += `;left:${x }px;top:${y}px;bottom:auto`
      };
      document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
      }
  }
  }
}
