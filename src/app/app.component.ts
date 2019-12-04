import { Component, ViewChild } from '@angular/core';
import { MvwTableComponent } from './mvw-packege/mvw-table/mvw-table.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('mvwTabel', { static: true }) mvwTabel: MvwTableComponent;
  tableConfig: any;
  tabledata: any;

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.init();
  }

  init() {
    this.tabledata = {
      content: (() => {
        const arr = [];
        for (let i = 0; i < 20; i++) {
          arr.push({
            key: 'id' + i,
            name: 'name' + i
          });
        }
        return arr;
      })(),
      totalElements: 1566,
      totalPages: 79,
      number: 1,
    };
    this.tableConfig = {
      pageSize: 20,
      tableHeight: '',
      loading: false,
      showSizeChanger: true,
      query: {
        field: [
          // 新增字段
          { field: '姓名/身份证', type: 'text', id: 'queryName', placeholder: '姓名/身份证', icon: '' },
          {
            field: '参培年份', type: 'select', id: 'traineeYear', placeholder: '', icon: '',
            option: [
              { key: '', value: '全部' },
              { key: '2025', value: '2025' },
              { key: '2024', value: '2024' },
              { key: '2023', value: '2023' },
              { key: '2022', value: '2022' },
              { key: '2021', value: '2021' },
              { key: '2020', value: '2020' },
              { key: '2019', value: '2019' },
              { key: '2018', value: '2018' },
              { key: '2017', value: '2017' },
              { key: '2016', value: '2016' },
              { key: '2015', value: '2015' }
            ]
          },
          {
            field: '专业', type: 'select', id: 'traineeMajorCode', placeholder: '', icon: '',
            option: [{ key: '1', value: '全部'}]
          },
          {field: '日期', type: 'range', id: 'scheduleStartTimet', placeholder: '', icon: '', format: 'yyyy-MM-dd'},
          {
            type: 'btn', name: '导出', nzType: 'default', icon: 'export', class: 'right', click: (res: any) => {
              console.log(res);
            }
          }
        ],
        btns: [
          {
            name: '查询', type: 'btn', nzType: 'default', click: (res: any) => {
              this.tableConfig.query.btns[0].nzType = 'primary';
              this.tableConfig.query.btns[1].nzType = 'default';
              const obj = Object.keys(this.mvwTabel.getQueryDataWithPage(1));
            }
          },
          {
            name: '数据上报', type: 'btn', nzType: 'default', click: (res: any) => {
              this.tableConfig.query.btns[1].nzType = 'primary';
              this.tableConfig.query.btns[0].nzType = 'default';
              // this.uploaderDataFn();
            }
          }
        ]
      },
      column: [
        { field: '', type: 'checkbox', id: '', width: '50px', left: '0px' },
        { field: '序号', type: 'seed', id: '', width: '65px', left: '50px' },
        {
          field: '姓名', type: 'link', id: 'name', width: '100px',
          click: (res) => {
            console.log(res);
          }
        },
        { field: '参培年份', type: 'text', id: 'traineeYear', width: '160px' },
        { field: '专业', type: 'text', id: 'traineeMajorCode', width: '160px'},
        { field: '身份证号码', type: 'text', id: 'idCard', width: '160px' },
        { field: '日期', type: 'text', id: 'activityDate', width: '120px' },
        { field: '活动形式', type: 'text', id: 'activityType', width: '100px' },
        // {field: '活动形式代码', type: 'text', id: 'specialityTitle', width: '130px'},
        { field: '教学层次', type: 'text', id: 'activityLevel', width: '100px' },
        // {field: '教学层次代码', type: 'text', id: 'specialityTitle', width: '130px'},
        { field: '活动内容', type: 'text', id: 'activityContent', width: '150px' },
        { field: '学时', type: 'text', id: 'activityDuration', width: '120px' },
        // {field: '学时代码', type: 'text', id: 'specialityTitle', width: '120px'},
        { field: '主讲人/组织者姓名', type: 'text', id: 'keynoteSpeaker', width: '160px' },
        { field: '附件', type: 'file', id: 'activityAttachments', width: '100px', right: '120px' },
        { field: '保存时间', type: 'text', id: 'createTime', width: '120px', right: '0px' },
      ],
      pager: {
        click: (page: any) => {
          console.log(page);
        },
        changeSize: (size: any) => {
          console.log(size);
        }
      }
    };
  }
}
