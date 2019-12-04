import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mvw-table',
  templateUrl: './mvw-table.component.html',
  styleUrls: ['./mvw-table.component.css']
})
export class MvwTableComponent implements OnInit {
  @Input() config: any;
  @Input() data: any;
  pageSize: any;
  inputValue: any = '';
  width: any;
  showImg: any = false;
  imgSrc: any = '';
  queryData: any;
  isAllchecked: any = false;
  isIndeterminate: any = false;
  marginTop: any = '10px';
  constructor(private sanitizer: DomSanitizer, private ele: ElementRef) { }

  ngOnInit() {
    this.init();
    this.initData();
    this.initQueryData();
    if (this.config && !this.config.tableHeight) {
      window.addEventListener('resize', () => {
        this.initTableHeight();
        this.getMarginTop();
      });
    } else {
      let offsetTop = window.innerHeight - parseInt(this.config.tableHeight, 0);
      window.addEventListener('resize', () => {
        this.getMarginTop();
        this.config.tableHeight = window.innerHeight - offsetTop + 'px';
      });
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.config && !this.config.tableHeight) {
        this.initTableHeight();
      }
    }, 0);
    let num = 1;
    this.initMtOP(num);
  }
  initMtOP(num) {
    setTimeout(() => {
      if (this.hasData()) {
        this.getMarginTop();
      } else {
        if (num < 50) {
          num++;
          this.initMtOP(num);
        }
      }
    }, 100);
  }
  hasData() {
    if (this.data.content && this.data.content.length > 0) {
      return true;
    }
    if (this.data.records && this.data.records.length > 0) {
      return true;
    }
    return false;
  }
  checkAll(checked: any) {
    if (this.data.records) {
      this.data.records.forEach(item => {
        if (!item.disabled) {
          item.checked = checked;
        }
      });
    }
    if (this.data.content) {
      this.data.content.forEach(item => {
        if (!item.disabled) {
          item.checked = checked;
        }
      });
    }
  }
  getSelectVal(arr: any, key: any) {
    for (const item of arr) {
      if (item.key == key) {
        return item.value;
      }
    }
  }
  formBtnClick(btn: any) {
    if (btn.click) {
      btn.click(btn);
    }
  }

  clearQueryData() {
    for (const key in this.queryData) {
      if (this.queryData[key]) {
        this.queryData[key] = '';
      }
    }
  }

  getCheckedData(key?: any) {
    const arr = [];
    if (this.data && this.data.records) {
      this.data.records.forEach(item => {
        if (item.checked) {
          if (key && item[key]) {
            arr.push(item[key]);
          } else {
            arr.push(item);
          }
        }
      });
    }
    if (this.data && this.data.content) {
      this.data.content.forEach(item => {
        if (item.checked) {
          if (key && item[key]) {
            arr.push(item[key]);
          } else {
            arr.push(item);
          }
        }
      });
    }
    return arr;
  }
  initTableHeight() {
    const queryHeight = this.ele.nativeElement.querySelector('.query').offsetHeight;
    this.config.tableHeight = (window.innerHeight
      - (this.config.otherHeight ? parseInt(this.config.otherHeight, 0)
      : 187) - queryHeight) + 'px';
  }
  testTemplate(data: any) {
    console.log(data);
    return true;
  }
  initData() {
    if (!this.data) {
      this.data = {
        records: [],
        total: 1,
        current: 1,
      };
    }
  }
  initQueryData() {
    this.queryData = {};
    if (this.config && this.config.query &&  this.config.query.field) {
      this.config.query.field.forEach(item => {
        this.queryData[item.id] = item.value ? item.value : '';
      });
    }
  }
  getQueryDataWithPage(page: any) {
    let obj = {};
    for (const key in this.queryData) {
      if (this.queryData.hasOwnProperty(key)) {
        const val = this.queryData[key];
        if (val !== '' && val !== null && val !== undefined) {
          obj[key] = val instanceof Date ? val.toLocaleDateString().replace(/\//g, '-') : val;
        }
      }
    }
    obj['page'] = page;
    return obj;
  }
  dateForMat(time: any, format: any) {
    if (time) {
      return this.forMat(time, format);
    } else {
      return '';
    }
  }
    /**
     * @async 时间格式化 -- 字符串
     * @param -{Date, forMat}
     * @returns String
     */
    forMat(time: any, forMat?: any) {
      if (!time) {
          return '';
      }
      if (/^\d{4}\-\d{2}$/.test(time)) {
          time = time + '-01';
      }
      if (typeof time === 'string') {
          time = new Date(time.replace(/-/g, '/'))
      }
      if (typeof time === 'number') {
          time = new Date(time);
      }
      const Y = time.getFullYear();
      const M = time.getMonth();
      const D = time.getDate();
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();
      let result = Y + '-' + this.forMatNum(M, true) + '-' + this.forMatNum(D) + ' '
          + this.forMatNum(h) + ':' + this.forMatNum(m) + ':' + this.forMatNum(s)
      if (forMat === 'hh:mm') {
          return this.forMatNum(h) + ':' + this.forMatNum(m);
      }
      if (forMat) {
          if (/\//.test(forMat)) {
              result.replace(/-/g, '/');
          }
          result = result.slice(0, forMat.length);
      }
      return result;
  }
  /**
   * @async 时间格式化 -- 字符串
   * @param — {val, falg}
   * @returns String
   */
  forMatNum(val: any, flag?: any) {
      if (flag) {
          val++;
      }
      if (val > 9) {
          return val;
      }
      return '0' + val;
  }
  changeValue(e, config, data, key) {
    let val = data[key];
    let min = val.split('.');
    if (config.reg) {
      const REG = new RegExp(config.reg);
      if (REG.test(val)) {
        val = parseInt(val, 0) + '' === 'NaN' ? 0 : parseInt(val, 0) ;
      }
      if (min[1]) {
        val = Number(val + '.' + parseInt(min[1], 0));
      }
    }
    if (config.toFixed) {
      // setTimeout(() => {
        if (!min[1]) {
          data[key] = data[key] + '.00';
        } else {
          data[key] = eval(config.toFixed.replace('model', 'val'));
        }
      // }, 0);
    }
  }
  getHtml(config, data, key) {
    if (data[key] || data[key] === 0) {
      let val = data[key];
      let min = (val + '').split('.');
      if (config.toFixed) {
          val = val - 0;
          if (!min[1]) {
            return val + '.00';
          } else {
            return eval(config.toFixed.replace('model', 'val'));
          }
      } else {
        return val;
      }
    }
    return '';
  }
  getWidth_textarea(width) {
    return parseInt(width, 0) - 40 + 'px';
  }
  isEdit(data) {
    return data.edit ? true : false ;
  }
  isShowBtn(btn, data) {
    if (!btn.condition) {
      return true;
    }
    const flag = btn.condition.replace('model', 'data');
    if (eval(flag)) {
      return true;
    }
    return false;
  }
  getColor(config: any, data: any) {
    if (config && config.colors) {
      let resultColor = 'rgba(0, 0, 0, 0.65)';
      config.colors.forEach(color => {
        let flag = color.condition.replace('model', 'data');
        if (eval(flag)) {
          resultColor = color.color;
        }
      });
      return resultColor;
    }
  }
  getCursor(config: any, data: any) {
    if (config && config.cursor) {
      let resultCursor = 'text';
      config.cursors.forEach(cursor => {
        let flag = cursor.condition.replace('model', 'data');
        if (eval(flag)) {
          resultCursor = cursor.cursor;
        }
      });

      return resultCursor;
    }

  }
  selectClick(config: any, data: any, code: any) {
    if (config.click) {
      config.click(code, data);
    }
  }
  getFile(fileStr: any) {
    if (fileStr) {
      return fileStr.split(',');
    } else {
      return [];
    }
  }
  showFile(src: any) {
    this.showImg = true;
    this.imgSrc = src;
  }
  changePage(index: any) {
    if (this.config.pager) {
      this.config.pager.click(index);
    }
  }
  pageSizeChange(size: any) {
    console.log(size);
    this.config.pageSize = size;
    if (this.config.pager) {
      this.config.pager.changeSize(size);
    }
  }
  init() {
    this.pageSize = this.config.pageSize;
    if (this.config && this.config.column) {
      let width = 0;
      this.config.column.forEach(item => {
        width += parseInt(item.width, 0);
      });
      this.width = width + 'px';
    }
  }
  /**
   * 数据数组行渲染
   */
  getRlist(data, list) {
    let htmlList = [];
    data.forEach(item => {
      let htmlTem = '';
      list.forEach(element => {
        if (element.type == 'text') {
          htmlTem += `<span style="margin-left:10px"> ${item[element.id]} </span> `;
        } else if (element.type == 'date') {
          let dateTime = this.forMat( item[element.id] , 'yyyy-MM-dd');
          htmlTem += `<span style="margin-left:10px"> ${dateTime} </span> `;
        }
      });
      let safehtmlTem = this.sanitizer.bypassSecurityTrustHtml(htmlTem);
      htmlList.push(safehtmlTem);
    });
    return htmlList;
  }

  getMarginTop() {
    setTimeout(() => {
      if (this.config.tableHeight) {
        const dom = this.ele.nativeElement.querySelectorAll('.ant-table-body');
        this.marginTop =  parseInt(this.config.tableHeight, 0) - dom[dom.length - 1].offsetHeight + 10 + 'px';
      } else {
        this.marginTop =  '10px';
      }
    }, 0);
  }

  showPager() {
    // tslint:disable-next-line:max-line-length
    if (this.data && !this.config.pageHide && ((this.data.records && this.data.records.length > 0) || (this.data.content && this.data.content.length > 0))) {
      return true;
    }
    return false;
  }

  clickGopage() {
    let page = this.data.current || this.data.number;
    let total = this.data.total || this.data.totalElements;
    if (this.inputValue && this.inputValue != '0' && this.inputValue <= total && this.inputValue != page) {
      this.changePage(this.inputValue);
    }
    this.inputValue = '';
  }

  inputChange(evt) {
    setTimeout(() => {
      this.inputValue = this.inputValue.replace(/[^\d]/g, '');
    }, 0);
  }

  keyupGoPage(evt) {
    const theEvent = window.event || evt;
    const code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code === 13 && this.inputValue) {
        this.clickGopage();
    }
  }

}
