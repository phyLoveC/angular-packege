# MVWPACKEGE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## npm 发布 packege包  参考：https://blog.csdn.net/m0_37729058/article/details/86150970
1.切换分支到-packege分支， git checkout packege
2.合并开发分支master最新代码， git merge master
3.根目录下执行打包命令， npm run packagr
4.进入dist文件夹下执行命令打成压缩包， cd dist、 npm pack
5.检查npm源地址，nrm ls，确保地址是npm而不是其他。【非常重要】不然推送不成功
6.npm登陆检查，未登录执行，npm login 进行登陆，然后执行 npm publish 推送；已登陆直接执行 npm publish进行推送