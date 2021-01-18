// const getCaretCoordinates = require('textarea-caret')

// 获取光标位置
function getSelectionCoords(win) {
  win = win || window;
  var doc = win.document;
  var sel = doc.selection, range, rects, rect;
  var x = 0, y = 0;
  if (sel) {
      if (sel.type !== "Control") {
          range = sel.createRange();
          range.collapse(true);
          x = range.boundingLeft;
          y = range.boundingTop;
      }
  } else if (win.getSelection) {
      sel = win.getSelection();
      if (sel.rangeCount) {
          range = sel.getRangeAt(0).cloneRange();
          if (range.getClientRects) {
              range.collapse(true);
              rects = range.getClientRects();
              if (rects.length > 0) {
                  rect = rects[0];
              }
              // 光标在行首时，rect为undefined
              if(rect){
                  x = rect.left;
                  y = rect.top;
              }
          }
          // Fall back to inserting a temporary element
          if ((x === 0 && y === 0) || rect === undefined) {
              var span = doc.createElement("span");
              if (span.getClientRects) {
                  // Ensure span has dimensions and position by
                  // adding a zero-width space character
                  span.appendChild( doc.createTextNode("\u200b") );
                  range.insertNode(span);
                  rect = span.getClientRects()[0];
                  x = rect.left;
                  y = rect.top;
                  var spanParent = span.parentNode;
                  spanParent.removeChild(span);

                  // Glue any broken text nodes back together
                  spanParent.normalize();
              }
          }
      }
  }
  return { x: x, y: y };
}

function insertText(obj,str) {
  if (document.selection) {
      var sel = document.selection.createRange();
      sel.text = str;
  } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
      var startPos = obj.selectionStart,
          endPos = obj.selectionEnd,
          cursorPos = startPos,
          tmpStr = obj.value;
      obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
      cursorPos += str.length;
      obj.selectionStart = obj.selectionEnd = cursorPos;
  } else {
      obj.value += str;
  }
}
function moveEnd(obj){
  obj.focus();
  var len = obj.value.length;
  if (document.selection) {
      var sel = obj.createTextRange();
      sel.moveStart('character',len);
      sel.collapse();
      sel.select();
  } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
      obj.selectionStart = obj.selectionEnd = len;
  }
} 
module.exports = {
  getSelectionCoords,
  insertText,
  moveEnd
}