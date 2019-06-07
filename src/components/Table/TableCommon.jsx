export function getFixedHeaderOption(tableId, paginationId, padding=24) {
  const table = document.getElementById(tableId);
  let {left, width, top, height} = table.getBoundingClientRect();
  let fixedHeaderColsWidth = [];
  let colWidth = 0;
  const headerCells = table.querySelector('thead>tr').children;
  Array.prototype.forEach.call(headerCells, function(ele, idx) {
    colWidth = ele.getBoundingClientRect().width - padding;
    if (headerCells.length === (idx) + 1) {
      colWidth -= padding;
    }
    fixedHeaderColsWidth.push(colWidth);
  });

  const pagination = document.getElementById(paginationId);
  if (pagination) {
    const paginationHeight = pagination.getBoundingClientRect().height;
    height += paginationHeight;
  }
  if (top < 64 && top > (64 - height)) {
    return {showFixedHeader: true, fixedHeaderPosition: {left, width, top: 64}, fixedHeaderColsWidth};
  } else {
    return {showFixedHeader: false};
  }
};